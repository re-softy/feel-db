function ResetPasswordForm() {
  return (
    <div className="grid gap-4 py-4">
      <div className="grid grid-cols-4 items-center gap-4">
        <label htmlFor="email" className="text-right">Email</label>
        <input id="email" placeholder="your-email@example.com" className="col-span-3" />
      </div>
      <p>Enter your email to receive a password reset link.</p>
    </div>
  );
}

export default ResetPasswordForm;
