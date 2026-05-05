import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function DisclaimerPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-3xl px-6 py-16">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 mb-10"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to home
        </Link>

        <h1 className="text-3xl font-bold text-slate-900 mb-2">Disclaimer & Terms of Use</h1>
        <p className="text-sm text-slate-400 mb-10">Last updated: May 2026</p>

        <div className="prose prose-slate prose-sm max-w-none space-y-8">
          <section>
            <h2 className="text-lg font-semibold text-slate-900">1. Proof of Concept Status</h2>
            <p className="text-slate-600 leading-relaxed">
              MedCompare is a <strong>technology demonstration and proof of concept only</strong>. It
              is not a finished product, medical device, clinical decision support system, or
              healthcare application. It has not been reviewed, validated, approved, or endorsed by
              any medical, pharmaceutical, regulatory, or governmental body, including but not
              limited to the U.S. Food and Drug Administration (FDA), the European Medicines Agency
              (EMA), or any state medical board.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-900">2. No Medical Advice</h2>
            <p className="text-slate-600 leading-relaxed">
              Nothing contained in this application constitutes medical advice, diagnosis, prognosis,
              treatment recommendation, or prescription guidance. The information presented is{" "}
              <strong>not a substitute for professional medical advice, diagnosis, or treatment</strong>.
              Never disregard professional medical advice or delay seeking it because of something
              you have read or seen in this application. If you are experiencing a medical emergency,
              call your local emergency services immediately.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-900">3. Data Accuracy & Limitations</h2>
            <p className="text-slate-600 leading-relaxed">
              The medication profiles, scores, rankings, side effect data, clinical notes, dosing
              information, and all other data presented in this application are{" "}
              <strong>approximate, illustrative, and intended for demonstration purposes only</strong>.
              This data:
            </p>
            <ul className="list-disc pl-6 text-slate-600 space-y-2 mt-3">
              <li>Has not been derived from or validated against controlled clinical trials</li>
              <li>Has not been peer-reviewed by medical professionals</li>
              <li>May contain inaccuracies, errors, omissions, or outdated information</li>
              <li>Does not account for individual patient factors including but not limited to
                genetics, comorbidities, concurrent medications, age, weight, organ function,
                pregnancy status, or medical history</li>
              <li>Should not be relied upon for any clinical, personal, or professional
                decision-making regarding medication selection, dosing, or management</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-900">4. No Doctor-Patient Relationship</h2>
            <p className="text-slate-600 leading-relaxed">
              Use of this application does not create a doctor-patient relationship, pharmacist-patient
              relationship, or any other professional healthcare relationship between you and the
              creators, developers, or operators of MedCompare. No licensed healthcare professional
              is monitoring your use of this tool or the decisions you make based on its output.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-900">5. Assumption of Risk</h2>
            <p className="text-slate-600 leading-relaxed">
              By accessing and using this application, you acknowledge and agree that you do so{" "}
              <strong>entirely at your own risk</strong>. You understand that the information
              presented may be incomplete, inaccurate, or misleading, and you accept full
              responsibility for any actions you take or decisions you make based on the content
              of this application.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-900">6. Limitation of Liability</h2>
            <p className="text-slate-600 leading-relaxed">
              To the fullest extent permitted by applicable law, the creators, developers, operators,
              contributors, and affiliates of MedCompare shall not be liable for any direct, indirect,
              incidental, special, consequential, or punitive damages, including but not limited to
              personal injury, wrongful death, property damage, loss of data, loss of income, or
              emotional distress, arising out of or in connection with your access to or use of this
              application, whether based on warranty, contract, tort (including negligence), strict
              liability, or any other legal theory, even if advised of the possibility of such damages.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-900">7. No Warranties</h2>
            <p className="text-slate-600 leading-relaxed">
              This application is provided <strong>&ldquo;as is&rdquo; and &ldquo;as available&rdquo;</strong>{" "}
              without warranties of any kind, either express or implied, including but not limited to
              implied warranties of merchantability, fitness for a particular purpose, accuracy,
              completeness, reliability, or non-infringement. The creators make no warranty that the
              application will meet your requirements, be uninterrupted, timely, secure, or error-free.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-900">8. Indemnification</h2>
            <p className="text-slate-600 leading-relaxed">
              You agree to indemnify, defend, and hold harmless the creators, developers, operators,
              and affiliates of MedCompare from and against any and all claims, liabilities, damages,
              losses, costs, and expenses (including reasonable attorneys&rsquo; fees) arising out of or
              in connection with your use of this application or your violation of these terms.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-900">9. Consult a Healthcare Professional</h2>
            <p className="text-slate-600 leading-relaxed">
              Any and all decisions regarding medication — including starting, stopping, switching,
              adjusting dosage, or combining medications — must be made in consultation with a
              qualified, licensed healthcare provider who has access to your complete medical history
              and can perform appropriate clinical evaluation. This application is not capable of
              providing personalized medical guidance.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-900">10. Governing Law</h2>
            <p className="text-slate-600 leading-relaxed">
              These terms shall be governed by and construed in accordance with applicable law,
              without regard to conflict of law principles. Any disputes arising from the use of
              this application shall be resolved through binding arbitration or in the courts of
              competent jurisdiction.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
