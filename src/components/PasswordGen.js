import React, { useState } from 'react';
import '../styles/PasswordGen.css'
import styled from 'styled-components';




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
    console.log(charset)
  }
  return password;
}

function getPasswordStrengthLabel(length) {
    if (length >= 4 && length <= 8) {
      return 'Weak';
    } else if (length >= 8 && length <= 24) {
      return 'Strong';
    } else if (length >= 25) {
      return 'Excellent';
    } else {
      return 'Weak';
    }
  }
  const PasswordStrengthLabel = styled.span`
  color: ${props => {
    switch (props.strength) {
      case 'Weak':
        return 'red';
      case 'Strong':
        return 'rgb(105, 179, 88)';
      case 'Excellent':
        return 'rgb(26, 142, 0)';
      default:
        return 'black';
    }
  }};
`;
  


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
  const strengthLabel = getPasswordStrengthLabel(passwordLength);
  return (

    <div className='main-wrapper'>

    <div className='wrapper'>

    <div>
      <h1>Password Generator</h1>
        <span className='description'>Generate complex passwords to be safe</span>
      <div className='password-area' style={{textAlign:'left', display:'flex'}}>
      <div>
          <h3 style={{margin:0, marginRight:10}}>Generated Password : </h3>
         
        </div>
      <textarea value={generatedPassword} onChange={handlePasswordChange} />
     

      <button disabled={!generatedPassword} onClick={handleCopyPassword}><i className="fa-solid fa-copy"></i> Copy</button>
  
      </div>
      <div>
      {/* Existing code for displaying generated password */}
      {generatedPassword && (
        <div className='strength' style={{display:'flex'}}>
          <span>Password Strength : </span>
          <div><PasswordStrengthLabel strength={strengthLabel}>{strengthLabel}</PasswordStrengthLabel> </div> 
          
        </div>
      )}
    </div>
      <div className='main-section' style={{textAlign:'left'}}>
        <label >Password Length :  {passwordLength}</label><br />
        <input className='slider' type="range" min="4" max="32" value={passwordLength} onChange={handleLengthChange} />
      </div>
      <div className='criterias'>

      <div >
        <label>
        <input type="checkbox" checked={includeLowerCase} onChange={handleLowerCaseChange} style={{ color: 'aqua' }} />
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
          <input type="checkbox" checked={includeSpecialChars} onChange={handleSpecialCharsChange} style={{color:'aqua'}} />
          Include Special Characters
        </label>
      </div>
      </div>
      <div className='btn-space'>

      <button className='generate' onClick={handleGeneratePassword}>Generate Password</button>
      </div>

    </div>
    </div>
    </div>
  );
}

export default PasswordGenerator;
