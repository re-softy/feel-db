function RegistrationForm() {
  return (
    <>
    <div className="grid grid-cols-4 items-center gap-4">
      <label htmlFor="name" className="text-right">Name</label>
      <input id="name" placeholder="Your name" className="col-span-3" />
    </div>
    <div className="grid grid-cols-4 items-center gap-4">
      <label htmlFor="name" className="text-right">Phone Number</label>
      <input id="number" placeholder="+995" className="col-span-3" />
    </div>
    <div className="grid grid-cols-4 items-center gap-4">
      <label htmlFor="email" className="text-right">Email</label>
      <input id="email" type="email" placeholder="youremail@mail.com" className="col-span-3" />
    </div>
    <div className="grid grid-cols-4 items-center gap-4">
      <label htmlFor="password" className="text-right">Password</label>
      <input id="password" type="password" placeholder="Your password" className="col-span-3" />
    </div>
    <div className="grid grid-cols-4 items-center gap-4">
      <label htmlFor="password" className="text-right">Repeat Password</label>
      <input id="password" type="password" placeholder="Your password" className="col-span-3" />
    </div>
  </>
  )
}

export default RegistrationForm;