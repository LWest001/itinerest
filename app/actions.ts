"use server";

import {
  encodedRedirect,
  getFilename,
  getTripsInsertionData,
} from "@/lib/utils";
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { Trip } from "@/global.types";
import { getUser } from "@/lib/data";
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
      "Thanks for signing up! Please check your email for a verification link."
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
      "Could not reset password"
    );
  }

  if (callbackUrl) {
    return redirect(callbackUrl);
  }

  return encodedRedirect(
    "success",
    "/forgot-password",
    "Check your email for a link to reset your password."
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
      "Password and confirm password are required"
    );
  }

  if (password !== confirmPassword) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Passwords do not match"
    );
  }

  const { error } = await supabase.auth.updateUser({
    password: password,
  });

  if (error) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Password update failed"
    );
  }

  encodedRedirect("success", "/protected/reset-password", "Password updated");
};

export const signOutAction = async () => {
  const supabase = createClient();
  await supabase.auth.signOut();
  return redirect("/sign-in");
};

/********* TRIP ACTIONS *********/

export const createTrip = async (formData: FormData) => {
  const supabase = createClient();
  let { data, error } = await supabase
    .from("trips")
    .insert([getTripsInsertionData(formData)])
    .select();
  if (!error) {
    revalidatePath("/protected/trips");
    redirect(data ? "/protected/trips/" + data[0].id : "/protected/trips");
  } else {
    console.error(error);
  }
};

export const updateTrip = async (id: Trip["id"], formData: FormData) => {
  const supabase = createClient();
  let { error } = await supabase
    .from("trips")
    .update([getTripsInsertionData(formData)])
    .eq("id", id);
  console.log({ formData });
  if (!error) {
    revalidatePath("/protected/trips");
    redirect("/protected/trips/" + id);
  } else {
    console.error(error);
  }
};

export const deleteTrip = async (id: Trip["id"]) => {
  const supabase = createClient();
  let { data, error } = await supabase.from("trips").delete().eq("id", id);
  if (!error) {
    revalidatePath("/protected/trips");
    redirect("/protected/trips");
  } else {
    console.error(error);
  }
};

/********* PROFILE ACTIONS *********/

export const updateProfile = async (formData: FormData) => {
  const supabase = createClient();
  const user = await getUser();
  const id = user?.id;
  const { data, error } = await supabase
    .from("profiles")
    .update({
      username: formData.get("username")?.toString(),
    })
    .eq("id", id);

  if (!error) {
    revalidatePath("/protected/settings");
    redirect("/protected/settings");
  } else {
    console.error(error);
  }
};

const _removeOldAvatar = async (id: string) => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("profiles")
    .select("avatar_url")
    .eq("id", id)
    .single();

  if (!error) {
    const filename = getFilename(data.avatar_url);
    await supabase.storage.from("avatars").remove([`${id}/${filename}`]);
  } else {
    console.error(error);
  }
};

const _updateAvatarUrl = async (path: string, id: string) => {
  const supabase = createClient();
  const publicUrl = supabase.storage.from("avatars").getPublicUrl(path);
  const { data, error } = await supabase
    .from("profiles")
    .update({
      avatar_url: publicUrl.data.publicUrl,
    })
    .eq("id", id);

  if (!error) {
    revalidatePath("/protected/settings");
    redirect("/protected/settings");
  } else {
    console.error(error);
  }
};

export const uploadAvatar = async (formData: FormData) => {
  const supabase = createClient();
  const user = await getUser();
  if (user) {
    const { id } = user;
    const avatarFile = formData.get("avatar") as File;

    // Upload the new avatar file to the storage bucket
    const { data, error } = await supabase.storage
      .from("avatars")
      .upload(`${id}/avatar-${crypto.randomUUID()}`, avatarFile, {
        cacheControl: "3600",
        upsert: true,
      });

    if (!error && data) {
      await _removeOldAvatar(id);
      await _updateAvatarUrl(data.path, id);
    } else {
      console.error(error);
    }
  }
};

