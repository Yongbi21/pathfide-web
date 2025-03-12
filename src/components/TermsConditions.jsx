import React from 'react'

const TermsConditions = () => {
  return (
    <dialog id="my_modal_1" className="modal">
    <div className="modal-box">
      <h3 className="font-bold text-lg">Terms & Conditions</h3>
      
      <div className="py-4">
        <p className="mb-2">
          Welcome to [Your Application Name]. By using our service, you agree to the following terms and conditions:
        </p>

        <h4 className="font-semibold">1. Acceptance of Terms</h4>
        <p className="mb-2">
          By accessing or using our services, including filling out forms, you agree to comply with these terms. If you do not agree, please do not use our services.
        </p>

        <h4 className="font-semibold">2. Changes to Terms</h4>
        <p className="mb-2">
          We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting. Your continued use of the services after changes signifies your acceptance of the revised terms.
        </p>

        <h4 className="font-semibold">3. User Responsibilities</h4>
        <p className="mb-2">
          Users must provide accurate and complete information when filling out forms related to appointments. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.
        </p>

        <h4 className="font-semibold">4. Data Privacy</h4>
        <p className="mb-2">
          We are committed to protecting your privacy. The personal information you provide through our forms will be used solely for the purpose of managing your appointments and improving our services. We will not sell, share, or rent your personal data to third parties without your consent, except as required by law.
        </p>

        <h4 className="font-semibold">5. Use of Data</h4>
        <p className="mb-2">
          By submitting your data, you consent to its collection and use for the following purposes:
          <ul className="list-disc pl-5">
            <li>Scheduling and managing appointments.</li>
            <li>Communicating with you regarding your appointments.</li>
            <li>Improving our services based on user feedback.</li>
          </ul>
        </p>

        <h4 className="font-semibold">6. Prohibited Activities</h4>
        <p className="mb-2">
          You agree not to engage in any of the following prohibited activities:
          <ul className="list-disc pl-5">
            <li>Violating any applicable laws or regulations.</li>
            <li>Impersonating any person or entity or misrepresenting your affiliation with any person or entity.</li>
            <li>Engaging in any activity that disrupts the services or its related systems.</li>
          </ul>
        </p>

        <h4 className="font-semibold">7. Limitation of Liability</h4>
        <p className="mb-2">
          [Your Application Name] shall not be liable for any direct, indirect, incidental, or consequential damages arising from the use or inability to use our services, including the accuracy of the information provided through forms.
        </p>

        <h4 className="font-semibold">8. Governing Law</h4>
        <p className="mb-2">
          These terms are governed by the laws of [Your Jurisdiction]. Any disputes will be resolved in the courts of [Your Jurisdiction].
        </p>

        <h4 className="font-semibold">9. Contact Information</h4>
        <p className="mb-2">
          If you have any questions about these terms, please contact us at [Your Contact Information].
        </p>
      </div>

      <div className="modal-action">
        <form method="dialog">
          {/* If there is a button in form, it will close the modal */}
          <button className="btn">Close</button>
        </form>
      </div>
    </div>
  </dialog>
  )
}

export default TermsConditions