"use server";

import { encodedRedirect } from "@/utils/utils";
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { Trip } from "@/global.types";

export const signUpAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const supabase = createClient();
  const origin = headers().get("origin");

  if (!email || !password) {
    return { error: "Email and password are required" };
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    console.error(error.code + " " + error.message);
    return encodedRedirect("error", "/sign-up", error.message);
  } else {
    return encodedRedirect(
      "success",
      "/sign-up",
      "Thanks for signing up! Please check your email for a verification link.",
    );
  }
};

export const signInAction = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const supabase = createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return encodedRedirect("error", "/sign-in", error.message);
  }

  return redirect("/protected");
};

export const forgotPasswordAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const supabase = createClient();
  const origin = headers().get("origin");
  const callbackUrl = formData.get("callbackUrl")?.toString();

  if (!email) {
    return encodedRedirect("error", "/forgot-password", "Email is required");
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/callback?redirect_to=/protected/reset-password`,
  });

  if (error) {
    console.error(error.message);
    return encodedRedirect(
      "error",
      "/forgot-password",
      "Could not reset password",
    );
  }

  if (callbackUrl) {
    return redirect(callbackUrl);
  }

  return encodedRedirect(
    "success",
    "/forgot-password",
    "Check your email for a link to reset your password.",
  );
};

export const resetPasswordAction = async (formData: FormData) => {
  const supabase = createClient();

  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!password || !confirmPassword) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Password and confirm password are required",
    );
  }

  if (password !== confirmPassword) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Passwords do not match",
    );
  }

  const { error } = await supabase.auth.updateUser({
    password: password,
  });

  if (error) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Password update failed",
    );
  }

  encodedRedirect("success", "/protected/reset-password", "Password updated");
};

export const signOutAction = async () => {
  const supabase = createClient();
  await supabase.auth.signOut();
  return redirect("/sign-in");
};

export const createTrip = async (formData: FormData) => {
  const supabase = createClient();
  let { data, error } = await supabase
    .from("trips")
    .insert([{ name: formData.get("name"), start_date: formData.get("start_date"), end_date: formData.get("end_date"),city: formData.get("city"), lodging_name: formData.get("lodging_name") }])
    .select();
  if (!error) {
    // When we call this, the fetching function in our notes page (where we have the server component) will be revalidated to get the new data
    revalidatePath("/protected/trips");
    redirect("/protected/trips");
  } else {
    console.error(error);
  }
};

export const updateTrip = async (id: Trip["id"], formData: FormData) => {
  const supabase = createClient();
  let { data, error } = await supabase
    .from("trips")
    .update({ name: formData.get("name"), start_date: formData.get("start_date"), end_date: formData.get("end_date"),city: formData.get("city"), lodging_name: formData.get("lodging_name") })
    .eq('id', id);
  
  if (!error) {    
    // When we call this, the fetching function in our notes page (where we have the server component) will be revalidated to get the new data
    revalidatePath("/protected/trips");
    redirect("/protected/trips");
  } else {
    console.error(error);
  }
};

export const deleteTrip = async (id: Trip["id"]) => {
  const supabase = createClient();
  let { data, error } = await supabase
    .from("trips")
    .delete()
    .eq('id', id);
  if (!error) {
    // When we call this, the fetching function in our notes page (where we have the server component) will be revalidated to get the new data
    revalidatePath("/protected/trips");
    redirect("/protected/trips");
  } else {
    console.error(error);
  }
}