import React, { useState } from 'react';

interface TagInputProps {
  tags: string[];
  type: string;
  placeholder: string;
  onTagChange: (tags: string[]) => void;
}

const TagInputComponent: React.FC<TagInputProps> = ({ type, placeholder, tags, onTagChange }) => {
  const [inputValue, setInputValue] = useState('');
  const [tagError, setTagError] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    setTagError('');
  };

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && inputValue.trim() !== '') {
      event.preventDefault();
      event.stopPropagation();

      // Check if the entered tag matches email
      const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;

      if (!emailPattern.test(inputValue.trim())) {
        setTagError(`Invalid tag type. Tag must be of type: ${type}`);
        return;
      }

      const newTags = [...tags, inputValue.trim()];
      onTagChange(newTags);
      setInputValue('');
      setTagError('');
    } else if (event.key === 'Enter') {
      event.preventDefault(); // Prevent submitting the form on Enter
      event.stopPropagation();
    }
  };

  const removeTag = (tagToRemove: string) => {
    const newTags = tags.filter((tag) => tag !== tagToRemove);
    onTagChange(newTags);
  };

  return (
    <div className="flex flex-col gap-1">
      <div className="flex flex-wrap gap-2">
        {tags?.map((tag, index) => (
          <div key={index} className="bg-[#F9F9F9] rounded-full px-2 py-1 flex items-center">
            {tag}
            <div className="ml-2 text-gray-600 cursor-pointer" onClick={() => removeTag(tag)}>
              &times;
            </div>
          </div>
        ))}
      </div>
      <input
        type={type}
        placeholder={placeholder}
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
        className="rounded-lg bg-[#F9F9F9] px-2 py-1 w-full border-2 border-transparent focus:border-[#518554] focus:outline-none"
      />
      {tagError && <div className="text-red-500 mt-1">{tagError}</div>}
    </div>
  );
};

export default TagInputComponent;
