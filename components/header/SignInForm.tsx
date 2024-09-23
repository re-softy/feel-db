function SignInForm({ onResetPassword }: { onResetPassword: () => void }) {
    return (
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <label htmlFor="email" className="text-right">Email</label>
          <input id="email" placeholder="your-email@example.com" className="col-span-3" />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <label htmlFor="password" className="text-right">Password</label>
          <input id="password" type="password" placeholder="••••••••" className="col-span-3" />
        </div>
        <div className="text-right">
          <span onClick={onResetPassword} className="text-blue-600 cursor-pointer">Forgot Password?</span>
        </div>
      </div>
    );
  }
  
  export default SignInForm;
  