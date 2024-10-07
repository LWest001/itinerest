function DataKV({ property, value }: { property: string; value: string }) {
  return (
    <div className="flex flex-col">
      <span className="text-secondary">{property}</span>
      <span className="text-primary">{value}</span>
    </div>
  );
}

export default DataKV;
