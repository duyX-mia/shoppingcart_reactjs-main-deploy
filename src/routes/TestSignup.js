import React from 'react';

function TestSignup() {
  return (
    <div className="form-container">
      <style>
        {`
          body {
            background-color: #f0f8ea;
            font-family: "Arial", sans-serif;
          }

          h1 {
            color: #354259;
            text-align: center;
          }

          form {
            max-width: 300px;
            margin: 20px auto;
            padding: 20px;
            background-color: #fff;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }

          label {
            display: block;
            margin-bottom: 8px;
            color: #354259;
          }

          // input {
          //   width: 100%;
          //   padding: 10px;
          //   margin-bottom: 15px;
          //   border: 1px solid #ccc;
          //   border-radius: 4px;
          //   box-sizing: border-box;
          // }

          input[type="submit"] {
            background-color: #354259;
            color: #fff;
            cursor: pointer;
          }

          input[type="submit"]:hover {
            background-color: #1e2a38;
          }
        `}
      </style>
      <form autoComplete="on">
  <h1>Register User Account</h1>
  <p>
    <label htmlFor="fullname">Full Name:</label>
    <input type="text" name="fullname" id="fullname" required minLength="2" maxLength="50" />
  </p>
  <p>
    <label htmlFor="email">Email:</label>
    <input type="email" name="email" id="email" required minLength="2" maxLength="50" />
  </p>
  <p>
    <label htmlFor="username">*Username:</label>
    <input type="text" name="username" id="username" required minLength="2" maxLength="20" pattern="[A-Za-z0-9]+" />
  </p>
  <p>
    <label htmlFor="password">*Password:</label>
    <input type="password" name="password" id="password" required minLength="6" maxLength="20" pattern="^(?=.*[A-Z])(?=.*\d).{6,20}$" />
  </p>
  <p>
    <label htmlFor="phone">Phone:</label>
    <input type="tel" name="phone" id="phone" required minLength="10" maxLength="11" />
  </p>
  <p>
    <label>Gender:</label><br />
    <input type="radio" name="gender" id="male" value="male" required />
    <label htmlFor="male">Male</label><br />
    <input type="radio" name="gender" id="female" value="female" required />
    <label htmlFor="female">Female</label><br />
    <input type="radio" name="gender" id="other" value="other" required />
    <label htmlFor="other">Other</label>
  </p>
  <p>
    <label>Skills:</label><br />
    <input type="checkbox" name="skills" id="java" value="Java" />
    <label htmlFor="java">Java</label><br />
    <input type="checkbox" name="skills" id="sql" value="SQL" />
    <label htmlFor="sql">SQL</label><br />
    <input type="checkbox" name="skills" id="reactjs" value="ReactJS" />
    <label htmlFor="reactjs">ReactJS</label>
  </p>
  <p>
    <label htmlFor="address">Address:</label>
    <input type="text" name="address" id="address" required />
  </p>
  <p>
    <input type="submit" value="Register" id="registerBtn" />
  </p>
</form>

    </div>
  );
}

export default TestSignup;
