import React, { useState } from 'react';
import './CustomRadioButton.css'; // Import your CSS file

const RadioButton = () => {
    const [selectedOption, setSelectedOption] = useState('');

    const handleChange = (event) => {
        setSelectedOption(event.target.value);
    };

    return (
        <div className="custom-radio-group">
            <label className={`custom-radio ${selectedOption === 'option1' ? 'selected' : ''}`}>
                <input
                    type="radio"
                    value="option1"
                    checked={selectedOption === 'option1'}
                    onChange={handleChange}
                    className="custom-radio-input"
                />
                <span className="custom-radio-icon">🌟</span> {/* Custom Icon */}
                Option 1
            </label>
            <label className={`custom-radio ${selectedOption === 'option2' ? 'selected' : ''}`}>
                <input
                    type="radio"
                    value="option2"
                    checked={selectedOption === 'option2'}
                    onChange={handleChange}
                    className="custom-radio-input"
                />
                <span className="custom-radio-icon">🚀</span> {/* Custom Icon */}
                Option 2
            </label>
            <label className={`custom-radio ${selectedOption === 'option3' ? 'selected' : ''}`}>
                <input
                    type="radio"
                    value="option3"
                    checked={selectedOption === 'option3'}
                    onChange={handleChange}
                    className="custom-radio-input"
                />
                <span className="custom-radio-icon">💡</span> {/* Custom Icon */}
                Option 3
            </label>
        </div>
    );
};

export default RadioButton;
