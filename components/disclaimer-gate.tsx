"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { AlertTriangle } from "lucide-react"

const STORAGE_KEY = "medcompare-disclaimer-acknowledged"

interface DisclaimerGateProps {
  children: React.ReactNode
}

export function DisclaimerGate({ children }: DisclaimerGateProps) {
  const [acknowledged, setAcknowledged] = useState<boolean | null>(null)

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    setAcknowledged(stored === "true")
  }, [])

  const handleAcknowledge = () => {
    localStorage.setItem(STORAGE_KEY, "true")
    setAcknowledged(true)
  }

  // Loading state — avoid flash
  if (acknowledged === null) {
    return null
  }

  if (acknowledged) {
    return <>{children}</>
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-amber-50 border-b border-amber-100 px-6 py-5 flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-100">
            <AlertTriangle className="h-5 w-5 text-amber-600" />
          </div>
          <div>
            <h2 className="font-semibold text-slate-900">Important Disclaimer</h2>
            <p className="text-sm text-slate-500">Please read before continuing</p>
          </div>
        </div>

        {/* Body */}
        <div className="px-6 py-5 max-h-[50vh] overflow-y-auto">
          <div className="space-y-4 text-sm text-slate-600 leading-relaxed">
            <p>
              <strong className="text-slate-900">MedCompare is a proof of concept and technology
              demonstration only.</strong> It is not a medical product, clinical tool, or healthcare
              application.
            </p>

            <p>
              The medication data, scores, rankings, and all other information presented in this
              application are <strong>approximate and illustrative</strong>. They have not been
              validated by clinical trials, peer-reviewed by medical professionals, or approved by
              any regulatory body.
            </p>

            <p>
              <strong>This application does not provide medical advice.</strong> Nothing in this tool
              should be used to make decisions about starting, stopping, switching, or adjusting any
              medication. All medication decisions must be made with a qualified healthcare provider.
            </p>

            <p>
              By continuing, you acknowledge that:
            </p>

            <ul className="list-disc pl-5 space-y-1.5 text-slate-500">
              <li>This is a proof of concept with no clinical validity</li>
              <li>The data may contain inaccuracies or errors</li>
              <li>You will not use this tool to make medical decisions</li>
              <li>No doctor-patient relationship is created by using this tool</li>
              <li>You assume all risk associated with your use of this application</li>
              <li>The creators accept no liability for any outcomes related to your use</li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-slate-100 px-6 py-4 bg-slate-50 space-y-3">
          <button
            onClick={handleAcknowledge}
            className="w-full rounded-lg bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-slate-800"
          >
            I Understand — This Is a Proof of Concept Only
          </button>
          <p className="text-center text-xs text-slate-400">
            By clicking above, you agree to our{" "}
            <Link href="/disclaimer" className="underline hover:text-slate-600">
              full disclaimer and terms of use
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  )
}
