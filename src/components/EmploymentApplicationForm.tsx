'use client'

import { useState } from 'react'

interface Employer {
  employerName: string
  supervisorName: string
  address: string
  cityStateZip: string
  jobDuties: string
  reasonForLeaving: string
  datesFrom: string
  datesTo: string
}

interface Reference {
  name: string
  address: string
  cityStateZip: string
  phone: string
  email: string
  relationship: string
}

const emptyEmployer: Employer = {
  employerName: '', supervisorName: '', address: '', cityStateZip: '',
  jobDuties: '', reasonForLeaving: '', datesFrom: '', datesTo: '',
}

const emptyReference: Reference = {
  name: '', address: '', cityStateZip: '', phone: '', email: '', relationship: '',
}

export default function EmploymentApplicationForm() {
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  // Applicant Information
  const [fullName, setFullName] = useState('')
  const [homeAddress, setHomeAddress] = useState('')
  const [cityStateZip, setCityStateZip] = useState('')
  const [yearsAtAddress, setYearsAtAddress] = useState('')
  const [mobilePhone, setMobilePhone] = useState('')
  const [emailAddress, setEmailAddress] = useState('')
  const [dateOfBirth, setDateOfBirth] = useState('')
  const [driversLicense, setDriversLicense] = useState('')
  const [drivingRecordConsent, setDrivingRecordConsent] = useState(false)
  const [shirtSize, setShirtSize] = useState('')
  const [vestSize, setVestSize] = useState('')
  const [jacketSize, setJacketSize] = useState('')

  // Emergency Contact
  const [emergencyFullName, setEmergencyFullName] = useState('')
  const [emergencyRelationship, setEmergencyRelationship] = useState('')
  const [emergencyAddress, setEmergencyAddress] = useState('')
  const [emergencyCityStateZip, setEmergencyCityStateZip] = useState('')
  const [emergencyMobilePhone, setEmergencyMobilePhone] = useState('')
  const [emergencyHomePhone, setEmergencyHomePhone] = useState('')

  // Job / Position
  const [positionApplyingFor, setPositionApplyingFor] = useState('')
  const [fullOrPartTime, setFullOrPartTime] = useState('')
  const [salaryDesired, setSalaryDesired] = useState('')
  const [salaryPer, setSalaryPer] = useState('Hour')
  const [referredBy, setReferredBy] = useState('')
  const [howGetToWork, setHowGetToWork] = useState('')
  const [willingToWorkAnyShift, setWillingToWorkAnyShift] = useState('')
  const [availableForOvertime, setAvailableForOvertime] = useState('')
  const [whenCanStart, setWhenCanStart] = useState('')
  const [convictedOfFelony, setConvictedOfFelony] = useState('')
  const [convictionDetails, setConvictionDetails] = useState('')
  const [convictionDate, setConvictionDate] = useState('')
  const [convictionCityState, setConvictionCityState] = useState('')

  // Employment History (3 slots)
  const [employers, setEmployers] = useState<Employer[]>([
    { ...emptyEmployer }, { ...emptyEmployer }, { ...emptyEmployer },
  ])

  // References (2 slots)
  const [references, setReferences] = useState<Reference[]>([
    { ...emptyReference }, { ...emptyReference },
  ])

  // Additional Info
  const [additionalInfo, setAdditionalInfo] = useState('')

  // Certification
  const [certificationAgreed, setCertificationAgreed] = useState(false)
  const [signatureName, setSignatureName] = useState('')
  const [signatureDate, setSignatureDate] = useState('')

  const updateEmployer = (index: number, field: keyof Employer, value: string) => {
    setEmployers(prev => {
      const updated = [...prev]
      updated[index] = { ...updated[index], [field]: value }
      return updated
    })
  }

  const updateReference = (index: number, field: keyof Reference, value: string) => {
    setReferences(prev => {
      const updated = [...prev]
      updated[index] = { ...updated[index], [field]: value }
      return updated
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSubmitting(true)

    try {
      const response = await fetch('/api/careers/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName, homeAddress, cityStateZip, yearsAtAddress, mobilePhone, emailAddress,
          dateOfBirth, driversLicense, drivingRecordConsent, shirtSize, vestSize, jacketSize,
          emergencyFullName, emergencyRelationship, emergencyAddress, emergencyCityStateZip,
          emergencyMobilePhone, emergencyHomePhone,
          positionApplyingFor, fullOrPartTime, salaryDesired, salaryPer, referredBy,
          howGetToWork, willingToWorkAnyShift, availableForOvertime, whenCanStart,
          convictedOfFelony, convictionDetails, convictionDate, convictionCityState,
          employers: employers.filter(e => e.employerName),
          references: references.filter(r => r.name),
          additionalInfo, certificationAgreed, signatureName, signatureDate,
        }),
      })

      if (!response.ok) {
        const result = await response.json()
        throw new Error(result.error || 'Failed to submit')
      }

      setSubmitted(true)
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-semibold text-gray-900 mb-2">Application Submitted</h3>
        <p className="text-gray-600">
          Thank you for your interest in BA Services. We will review your application and be in touch.
        </p>
      </div>
    )
  }

  const inputClass = 'w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-forest-DEFAULT focus:border-forest-DEFAULT text-sm'
  const labelClass = 'block text-sm font-medium text-gray-700 mb-1'
  const sectionClass = 'border-t-2 border-gray-200 pt-6 mt-8'

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Applicant Information */}
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-4">Applicant Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className={labelClass}>Full Name <span className="text-red-500">*</span></label>
            <input type="text" required value={fullName} onChange={e => setFullName(e.target.value)} className={inputClass} />
          </div>
          <div className="md:col-span-2">
            <label className={labelClass}>Home Address</label>
            <input type="text" value={homeAddress} onChange={e => setHomeAddress(e.target.value)} className={inputClass} />
          </div>
          <div className="md:col-span-2">
            <label className={labelClass}>City, State & Zip</label>
            <input type="text" value={cityStateZip} onChange={e => setCityStateZip(e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Number of Years at This Address</label>
            <input type="text" value={yearsAtAddress} onChange={e => setYearsAtAddress(e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Mobile Phone <span className="text-red-500">*</span></label>
            <input type="tel" required value={mobilePhone} onChange={e => setMobilePhone(e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Email Address <span className="text-red-500">*</span></label>
            <input type="email" required value={emailAddress} onChange={e => setEmailAddress(e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Date of Birth</label>
            <input type="date" value={dateOfBirth} onChange={e => setDateOfBirth(e.target.value)} className={inputClass} />
          </div>
          <div className="md:col-span-2">
            <label className={labelClass}>Driver&apos;s License (State & Number)</label>
            <input type="text" value={driversLicense} onChange={e => setDriversLicense(e.target.value)} className={inputClass} />
          </div>
          <div className="md:col-span-2">
            <label className="flex items-start gap-2 text-sm text-gray-700">
              <input
                type="checkbox"
                checked={drivingRecordConsent}
                onChange={e => setDrivingRecordConsent(e.target.checked)}
                className="mt-1 rounded border-gray-300"
              />
              <span>
                If part of your job will include driving on company business (in your vehicle or a company owned vehicle),
                BAS will pull your driving record from our secure investigation company PSI and share with our insurance
                provider prior to making you a job offer. I agree to this.
              </span>
            </label>
          </div>
          <div>
            <label className={labelClass}>Shirt Size</label>
            <input type="text" value={shirtSize} onChange={e => setShirtSize(e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Vest Size</label>
            <input type="text" value={vestSize} onChange={e => setVestSize(e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Jacket Size</label>
            <input type="text" value={jacketSize} onChange={e => setJacketSize(e.target.value)} className={inputClass} />
          </div>
        </div>
      </div>

      {/* Emergency Contact */}
      <div className={sectionClass}>
        <h3 className="text-xl font-bold text-gray-900 mb-1">Emergency Contact</h3>
        <p className="text-sm text-gray-500 mb-4">Whom should be contacted in the event of an emergency?</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className={labelClass}>Full Name</label>
            <input type="text" value={emergencyFullName} onChange={e => setEmergencyFullName(e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Relationship to You</label>
            <input type="text" value={emergencyRelationship} onChange={e => setEmergencyRelationship(e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Address</label>
            <input type="text" value={emergencyAddress} onChange={e => setEmergencyAddress(e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>City, State & Zip</label>
            <input type="text" value={emergencyCityStateZip} onChange={e => setEmergencyCityStateZip(e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Mobile Phone</label>
            <input type="tel" value={emergencyMobilePhone} onChange={e => setEmergencyMobilePhone(e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Home Phone</label>
            <input type="tel" value={emergencyHomePhone} onChange={e => setEmergencyHomePhone(e.target.value)} className={inputClass} />
          </div>
        </div>
      </div>

      {/* Job / Position Information */}
      <div className={sectionClass}>
        <h3 className="text-xl font-bold text-gray-900 mb-4">Job / Position Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className={labelClass}>Job / Position Applying For</label>
            <input type="text" value={positionApplyingFor} onChange={e => setPositionApplyingFor(e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Full or Part-Time</label>
            <select value={fullOrPartTime} onChange={e => setFullOrPartTime(e.target.value)} className={inputClass}>
              <option value="">Select...</option>
              <option value="Full-Time">Full-Time</option>
              <option value="Part-Time">Part-Time</option>
              <option value="Either">Either</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Salary Desired</label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">$</span>
                <input type="text" value={salaryDesired} onChange={e => setSalaryDesired(e.target.value)} className={`${inputClass} pl-7`} />
              </div>
              <select value={salaryPer} onChange={e => setSalaryPer(e.target.value)} className={`${inputClass} w-28`}>
                <option value="Hour">Per Hour</option>
                <option value="Week">Per Week</option>
                <option value="Month">Per Month</option>
                <option value="Year">Per Year</option>
              </select>
            </div>
          </div>
          <div>
            <label className={labelClass}>Who Referred You to BA Services?</label>
            <input type="text" value={referredBy} onChange={e => setReferredBy(e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>How Will You Get to Work?</label>
            <input type="text" value={howGetToWork} onChange={e => setHowGetToWork(e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Willing to Work Any Shift, Including Nights & Weekends?</label>
            <select value={willingToWorkAnyShift} onChange={e => setWillingToWorkAnyShift(e.target.value)} className={inputClass}>
              <option value="">Select...</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Available to Work Overtime?</label>
            <select value={availableForOvertime} onChange={e => setAvailableForOvertime(e.target.value)} className={inputClass}>
              <option value="">Select...</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
              <option value="N/A">N/A</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>If Offered Employment, When Can You Start?</label>
            <input type="text" value={whenCanStart} onChange={e => setWhenCanStart(e.target.value)} className={inputClass} />
          </div>
          <div className="md:col-span-2">
            <label className={labelClass}>Have You Ever Been Convicted of a Felony or Misdemeanor? *</label>
            <select value={convictedOfFelony} onChange={e => setConvictedOfFelony(e.target.value)} className={inputClass}>
              <option value="">Select...</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
            <p className="text-xs text-gray-500 mt-1">
              * The existence of a criminal record does not constitute an automatic bar to employment unless relevant to the type of employment.
            </p>
          </div>
          {convictedOfFelony === 'Yes' && (
            <>
              <div className="md:col-span-2">
                <label className={labelClass}>If Yes, What Were You Convicted Of?</label>
                <input type="text" value={convictionDetails} onChange={e => setConvictionDetails(e.target.value)} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Date of Conviction</label>
                <input type="text" value={convictionDate} onChange={e => setConvictionDate(e.target.value)} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>City and State of Conviction</label>
                <input type="text" value={convictionCityState} onChange={e => setConvictionCityState(e.target.value)} className={inputClass} />
              </div>
            </>
          )}
        </div>
      </div>

      {/* Employment History */}
      <div className={sectionClass}>
        <h3 className="text-xl font-bold text-gray-900 mb-1">Employment History</h3>
        <p className="text-sm text-gray-500 mb-4">
          List your current or most recent employment first. Please list all jobs (including self-employment and military service)
          which you have held, beginning with the most recent, and list and explain any gaps in employment.
        </p>
        {employers.map((emp, index) => (
          <div key={index} className={`${index > 0 ? 'mt-6 pt-6 border-t border-gray-200' : ''}`}>
            <h4 className="font-semibold text-gray-700 mb-3">Employer {index + 1}</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Employer Name</label>
                <input type="text" value={emp.employerName} onChange={e => updateEmployer(index, 'employerName', e.target.value)} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Supervisor&apos;s Name</label>
                <input type="text" value={emp.supervisorName} onChange={e => updateEmployer(index, 'supervisorName', e.target.value)} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Address</label>
                <input type="text" value={emp.address} onChange={e => updateEmployer(index, 'address', e.target.value)} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>City, State & Zip</label>
                <input type="text" value={emp.cityStateZip} onChange={e => updateEmployer(index, 'cityStateZip', e.target.value)} className={inputClass} />
              </div>
              <div className="md:col-span-2">
                <label className={labelClass}>Job Duties</label>
                <input type="text" value={emp.jobDuties} onChange={e => updateEmployer(index, 'jobDuties', e.target.value)} className={inputClass} />
              </div>
              <div className="md:col-span-2">
                <label className={labelClass}>Reason for Leaving</label>
                <input type="text" value={emp.reasonForLeaving} onChange={e => updateEmployer(index, 'reasonForLeaving', e.target.value)} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Dates of Employment - From (Month / Year)</label>
                <input type="text" placeholder="e.g. 01/2024" value={emp.datesFrom} onChange={e => updateEmployer(index, 'datesFrom', e.target.value)} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Dates of Employment - To (Month / Year)</label>
                <input type="text" placeholder="e.g. 12/2025" value={emp.datesTo} onChange={e => updateEmployer(index, 'datesTo', e.target.value)} className={inputClass} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* References */}
      <div className={sectionClass}>
        <h3 className="text-xl font-bold text-gray-900 mb-1">References</h3>
        <p className="text-sm text-gray-500 mb-4">
          List any two non-relatives who would be willing to provide a reference for you.
        </p>
        {references.map((ref, index) => (
          <div key={index} className={`${index > 0 ? 'mt-6 pt-6 border-t border-gray-200' : ''}`}>
            <h4 className="font-semibold text-gray-700 mb-3">Reference {index + 1}</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Name</label>
                <input type="text" value={ref.name} onChange={e => updateReference(index, 'name', e.target.value)} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Relationship</label>
                <input type="text" value={ref.relationship} onChange={e => updateReference(index, 'relationship', e.target.value)} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Address</label>
                <input type="text" value={ref.address} onChange={e => updateReference(index, 'address', e.target.value)} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>City, State & Zip</label>
                <input type="text" value={ref.cityStateZip} onChange={e => updateReference(index, 'cityStateZip', e.target.value)} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Phone</label>
                <input type="tel" value={ref.phone} onChange={e => updateReference(index, 'phone', e.target.value)} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Email</label>
                <input type="email" value={ref.email} onChange={e => updateReference(index, 'email', e.target.value)} className={inputClass} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Additional Information */}
      <div className={sectionClass}>
        <h3 className="text-xl font-bold text-gray-900 mb-1">Additional Information</h3>
        <p className="text-sm text-gray-500 mb-4">
          Please provide any other information that you believe should be considered, including whether you are bound by any agreement with any current employer.
        </p>
        <textarea
          rows={4}
          value={additionalInfo}
          onChange={e => setAdditionalInfo(e.target.value)}
          className={inputClass}
        />
      </div>

      {/* Certification */}
      <div className={sectionClass}>
        <h3 className="text-xl font-bold text-gray-900 mb-4">Certification</h3>
        <div className="bg-gray-50 rounded-lg p-4 mb-4 text-sm text-gray-700 space-y-3">
          <p>
            I certify that the information provided on this application is truthful and accurate. I understand that
            providing false or misleading information will be the basis for rejection of my application, or if
            employment commences, immediate termination.
          </p>
          <p>
            I authorize BA Services, Inc. to contact former employers and educational organizations regarding my
            employment and education. I authorize former employers and organizations to communicate information
            fully and freely regarding my previous employment, attendance, and grades. I authorize those persons
            designated as references to communicate information fully, and freely regarding my previous employment
            and education.
          </p>
          <p>
            If an employment relationship is created, I understand that unless I am offered a specific written
            contract of employment signed on behalf of the organization by its General Manager, the employment
            relationship will be &ldquo;at-will&rdquo;. In other words, the relationship will be entirely voluntary in nature,
            and either I or my employer will be able to terminate the employment relationship at any time and
            without cause.
          </p>
        </div>
        <div className="space-y-4">
          <label className="flex items-start gap-2 text-sm text-gray-700">
            <input
              type="checkbox"
              required
              checked={certificationAgreed}
              onChange={e => setCertificationAgreed(e.target.checked)}
              className="mt-1 rounded border-gray-300"
            />
            <span className="font-semibold">
              I have carefully read the above certification and understand and agree to its terms. <span className="text-red-500">*</span>
            </span>
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Signature (Type Your Full Name) <span className="text-red-500">*</span></label>
              <input type="text" required value={signatureName} onChange={e => setSignatureName(e.target.value)} className={`${inputClass} italic`} />
            </div>
            <div>
              <label className={labelClass}>Date <span className="text-red-500">*</span></label>
              <input type="date" required value={signatureDate} onChange={e => setSignatureDate(e.target.value)} className={inputClass} />
            </div>
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-4 text-sm">
          {error}
        </div>
      )}

      <div className="pt-4">
        <button
          type="submit"
          disabled={submitting}
          className="w-full md:w-auto px-8 py-3 bg-forest-DEFAULT text-white rounded-lg hover:bg-forest-light disabled:bg-gray-400 font-semibold text-lg transition-colors"
        >
          {submitting ? 'Submitting...' : 'Submit Application'}
        </button>
      </div>
    </form>
  )
}
