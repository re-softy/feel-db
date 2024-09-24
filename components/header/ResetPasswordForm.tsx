function ResetPasswordForm() {
  return (
    <form className="my-2">
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-2">
          <label htmlFor="email">Email</label>
          <input id="email" placeholder="your-email@example.com" className="w-full bg-black text-white p-2 border border-grey rounded-md focus:outline-none" />
        </div>
      </div>
    </form>
  );
}

export default ResetPasswordForm;
