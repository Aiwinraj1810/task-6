import React, { useState } from 'react';
import '../styles/PasswordGen.css'
function generatePassword(length, includeLowerCase, includeUpperCase, includeNumbers, includeSpecialChars) {
  let charset = '';
  if (includeLowerCase) charset += 'abcdefghijklmnopqrstuvwxyz';
  if (includeUpperCase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  if (includeNumbers) charset += '0123456789';
  if (includeSpecialChars) charset += '!@#$%^&*()-_=+';
  
  let password = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }
  return password;
}

function getPasswordStrengthLabel(length) {
    if (length >= 8 && length <= 10) {
      return 'Weak';
    } else if (length >= 11 && length <= 14) {
      return 'Strong';
    } else if (length >= 15) {
      return 'Excellent';
    } else {
      return 'Weak';
    }
  }
  


function PasswordGenerator() {
  const [passwordLength, setPasswordLength] = useState(12);
  const [includeLowerCase, setIncludeLowerCase] = useState(true);
  const [includeUpperCase, setIncludeUpperCase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSpecialChars, setIncludeSpecialChars] = useState(true);
  const [generatedPassword, setGeneratedPassword] = useState('');

  const handleGeneratePassword = () => {
    const password = generatePassword(
      passwordLength,
      includeLowerCase,
      includeUpperCase,
      includeNumbers,
      includeSpecialChars
    );
    setGeneratedPassword(password);
  };

  const handlePasswordChange = (e) => {
    setGeneratedPassword(e.target.value);
  };

  const handleLengthChange = (e) => {
    const length = parseInt(e.target.value);
    if (!isNaN(length) && length >= 4 && length <= 32) {
      setPasswordLength(length);
    }
  };

  const handleLowerCaseChange = (e) => {
    setIncludeLowerCase(e.target.checked);
  };

  const handleUpperCaseChange = (e) => {
    setIncludeUpperCase(e.target.checked);
  };

  const handleNumbersChange = (e) => {
    setIncludeNumbers(e.target.checked);
  };

  const handleSpecialCharsChange = (e) => {
    setIncludeSpecialChars(e.target.checked);
  };

  const handleCopyPassword = () => {
    navigator.clipboard.writeText(generatedPassword);
    alert("Password copied to clipboard!");
  };
  const passwordStrengthLabel = getPasswordStrengthLabel(generatedPassword.length);
  return (

    <div>

    <div className='wrapper'>

    <div>
      <h1>Password Generator</h1>
        <h2>Generate complex passwords to be safe</h2>
      <div className='password-area' style={{textAlign:'left', display:'flex'}}>
      <div>
          <h3 style={{margin:0, marginRight:10}}>Generated Password:</h3>
         
        </div>
      <textarea value={generatedPassword} onChange={handlePasswordChange} />
      <button disabled={!generatedPassword} onClick={handleCopyPassword}><i class="fa-solid fa-copy"></i> Copy</button>
      </div>
      <div>
      {/* Existing code for displaying generated password */}
      {generatedPassword && (
        <div>
          <span>Password Strength: </span>
          <span>{passwordStrengthLabel}</span>
          {/* Existing code... */}
        </div>
      )}
    </div>
      <div className='main-section' style={{textAlign:'left'}}>
        <label >Password Length: {passwordLength}</label><br />
        <input className='slider' type="range" min="4" max="32" value={passwordLength} onChange={handleLengthChange} />
      </div>
      <div className='criterias'>

      <div >
        <label>
          <input type="checkbox" checked={includeLowerCase} onChange={handleLowerCaseChange} />
          Include Lowercase Characters
        </label>
      </div>
      <div>
        <label>
          <input type="checkbox" checked={includeUpperCase} onChange={handleUpperCaseChange} />
          Include Uppercase Characters
        </label>
      </div>
      <div>
        <label>
          <input type="checkbox" checked={includeNumbers} onChange={handleNumbersChange} />
          Include Numbers
        </label>
      </div>
      <div>
        <label>
          <input type="checkbox" checked={includeSpecialChars} onChange={handleSpecialCharsChange} />
          Include Special Characters
        </label>
      </div>
      </div>
      <button className='generate' onClick={handleGeneratePassword}>Generate Password</button>

    </div>
    </div>
    </div>
  );
}

export default PasswordGenerator;
