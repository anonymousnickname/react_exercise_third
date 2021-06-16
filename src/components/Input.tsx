import React from "react";

type InputProps = {
    inputCode: string;
    onInput: (string) => void;
    label: string;
    placeholder: string;
};

const Input = ({inputCode, onInput, label, placeholder}: InputProps) => {
    return (
        <div className="form__group field">
            <input
                type="input"
                className="form__field"
                placeholder={placeholder}
                onChange={(e) => onInput(e.target.value)}
                value={inputCode}
                name="Country"
                id="Country"
                required
            />
            <label htmlFor="Country" className="form__label">
               {label}
            </label>
        </div>
    );
};

const MemoizedInput = React.memo(Input);

export default MemoizedInput;
