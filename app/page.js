"use client"

import { useState } from "react"

import SettingsPage from "@/components/SettingsPage"

export default function Home() {
  return (
    <main className="p-6 flex flex-col justify-center items-center">
      <SettingsPage />
    </main>
  )
}
