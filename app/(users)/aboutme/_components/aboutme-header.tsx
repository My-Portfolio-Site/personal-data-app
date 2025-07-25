
export default function AboutMeHeader({children}: {children: React.ReactNode}) {
  return (
    <div className="flex items-center justify-between gap-2">
      <div>
        <h1 className="text-xl md:text-2xl font-bold tracking-tight">About me</h1>
        <p className="text-muted-foreground text-sm md:text-base">Basic personal information and professional summary</p>
      </div>
      {children}
    </div>
  )
}
