import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

function getResend() {
  return new Resend(process.env.RESEND_API_KEY)
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    if (!data.fullName || !data.emailAddress || !data.mobilePhone) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const html = buildEmailHtml(data)

    await getResend().emails.send({
      from: 'BA Services <noreply@escape.baserves.com>',
      to: ['OfficeManager@BAServes.com', 'andrew@baserves.com', 'Eric@BAServes.com'],
      subject: `Employment Application - ${data.fullName}`,
      replyTo: data.emailAddress,
      html,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to send employment application:', error)
    return NextResponse.json({ error: 'Failed to send application' }, { status: 500 })
  }
}

function buildEmailHtml(data: any): string {
  const field = (label: string, value: string | undefined) => {
    if (!value) return ''
    return `<tr><td style="padding:6px 12px;font-weight:600;color:#374151;white-space:nowrap;vertical-align:top;">${label}</td><td style="padding:6px 12px;color:#111827;">${escapeHtml(value)}</td></tr>`
  }

  const sectionHeader = (title: string) =>
    `<tr><td colspan="2" style="padding:16px 12px 8px;font-size:18px;font-weight:700;color:#111827;border-bottom:2px solid #d1d5db;">${title}</td></tr>`

  const employerBlock = (emp: any, index: number) => {
    if (!emp?.employerName) return ''
    return `
      ${sectionHeader(`Employment History - Employer ${index + 1}`)}
      ${field('Employer Name', emp.employerName)}
      ${field("Supervisor's Name", emp.supervisorName)}
      ${field('Address', emp.address)}
      ${field('City, State & Zip', emp.cityStateZip)}
      ${field('Job Duties', emp.jobDuties)}
      ${field('Reason for Leaving', emp.reasonForLeaving)}
      ${field('Dates of Employment', emp.datesFrom && emp.datesTo ? `${emp.datesFrom} to ${emp.datesTo}` : (emp.datesFrom || emp.datesTo || ''))}
    `
  }

  const referenceBlock = (ref: any, index: number) => {
    if (!ref?.name) return ''
    return `
      ${sectionHeader(`Reference ${index + 1}`)}
      ${field('Name', ref.name)}
      ${field('Address', ref.address)}
      ${field('City, State & Zip', ref.cityStateZip)}
      ${field('Phone', ref.phone)}
      ${field('Email', ref.email)}
      ${field('Relationship', ref.relationship)}
    `
  }

  return `
    <!DOCTYPE html>
    <html>
    <head><meta charset="utf-8"></head>
    <body style="font-family:Arial,sans-serif;max-width:700px;margin:0 auto;padding:20px;background:#f9fafb;">
      <div style="background:#111827;color:white;padding:24px;border-radius:8px 8px 0 0;">
        <h1 style="margin:0;font-size:24px;">Employment Application</h1>
        <p style="margin:8px 0 0;color:#9ca3af;">Submitted ${new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} at ${new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}</p>
      </div>
      <div style="background:white;padding:8px 0;border-radius:0 0 8px 8px;border:1px solid #e5e7eb;">
        <table style="width:100%;border-collapse:collapse;">
          ${sectionHeader('Applicant Information')}
          ${field('Full Name', data.fullName)}
          ${field('Home Address', data.homeAddress)}
          ${field('City, State & Zip', data.cityStateZip)}
          ${field('Years at Address', data.yearsAtAddress)}
          ${field('Mobile Phone', data.mobilePhone)}
          ${field('Email Address', data.emailAddress)}
          ${field('Date of Birth', data.dateOfBirth)}
          ${field("Driver's License", data.driversLicense)}
          ${field('Driving Record Consent', data.drivingRecordConsent ? 'Yes' : 'No')}
          ${field('Shirt Size', data.shirtSize)}
          ${field('Vest Size', data.vestSize)}
          ${field('Jacket Size', data.jacketSize)}

          ${sectionHeader('Emergency Contact')}
          ${field('Full Name', data.emergencyFullName)}
          ${field('Relationship', data.emergencyRelationship)}
          ${field('Address', data.emergencyAddress)}
          ${field('City, State & Zip', data.emergencyCityStateZip)}
          ${field('Mobile Phone', data.emergencyMobilePhone)}
          ${field('Home Phone', data.emergencyHomePhone)}

          ${sectionHeader('Job / Position Information')}
          ${field('Position Applying For', data.positionApplyingFor)}
          ${field('Full or Part-Time', data.fullOrPartTime)}
          ${field('Salary Desired', data.salaryDesired && data.salaryPer ? `$${data.salaryDesired} per ${data.salaryPer}` : data.salaryDesired)}
          ${field('Referred By', data.referredBy)}
          ${field('How Will You Get to Work', data.howGetToWork)}
          ${field('Willing to Work Any Shift', data.willingToWorkAnyShift)}
          ${field('Available for Overtime', data.availableForOvertime)}
          ${field('When Can You Start', data.whenCanStart)}
          ${field('Convicted of Felony/Misdemeanor', data.convictedOfFelony)}
          ${data.convictedOfFelony === 'Yes' ? `
            ${field('Convicted Of', data.convictionDetails)}
            ${field('Date of Conviction', data.convictionDate)}
            ${field('City & State of Conviction', data.convictionCityState)}
          ` : ''}

          ${(data.employers || []).map((emp: any, i: number) => employerBlock(emp, i)).join('')}

          ${(data.references || []).map((ref: any, i: number) => referenceBlock(ref, i)).join('')}

          ${data.additionalInfo ? `
            ${sectionHeader('Additional Information')}
            <tr><td colspan="2" style="padding:8px 12px;color:#111827;">${escapeHtml(data.additionalInfo)}</td></tr>
          ` : ''}

          ${sectionHeader('Certification')}
          ${field('Agreed to Terms', data.certificationAgreed ? 'Yes' : 'No')}
          ${field('Signature (Typed)', data.signatureName)}
          ${field('Date', data.signatureDate)}
        </table>
      </div>
      <p style="text-align:center;color:#9ca3af;font-size:12px;margin-top:16px;">
        This application was submitted online via BAServes.com
      </p>
    </body>
    </html>
  `
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}
