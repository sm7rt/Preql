import CreateIcon from '@mui/icons-material/Create';
import Image from 'next/image';
import React, { useState } from 'react';
import { colors } from 'src/theme';

import { SheetButton } from './content.styles';

interface ISheetButtonProps {
  value: string;
  className: string;
  onClick: (e: React.MouseEvent<HTMLElement>) => void;
  onSave: (e: string) => void;
}

function EditableSheetButton({
  value,
  className,
  onClick,
  onSave,
}: ISheetButtonProps) {
  const [inputValue, setInputValue] = useState(value);
  const [editIcon, setEditIcon] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const handleSave = () => {
    setEditMode(false);
    onSave(inputValue);
  };

  const handleShowEditIcon = () => {
    setEditIcon(true);
  };

  const handleHideEditIcon = () => {
    setEditIcon(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === 'Escape') {
      e.preventDefault();
      setEditMode(false);
      onSave(inputValue);
      e.stopPropagation();
    }
  };

  const handleInputChange = (e) => setInputValue(e.target.value);

  return (
    <SheetButton
      className={className}
      onClick={onClick}
      onMouseEnter={handleShowEditIcon}
      onMouseLeave={handleHideEditIcon}
      sx={{
        '&:hover': { backgroundColor: colors.wfBase[200] },
        textTransform: 'none',
      }}
    >
      <div style={{ alignItems: 'center', display: 'flex', gap: 10 }}>
        {!editMode ? (
          <>
            <Image
              alt="window-icon"
              height="20"
              src="/icons/window.svg"
              width="20"
            />
            {inputValue}
          </>
        ) : (
          <input
            autoFocus
            onBlur={handleSave}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            style={{
              backgroundColor: 'transparent',
              outline: 'none',
            }}
            type="text"
            value={inputValue}
          />
        )}
      </div>
      {editIcon ? (
        <CreateIcon
          onClick={() => setEditMode(!editMode)}
          sx={{ color: 'gray' }}
        />
      ) : null}
    </SheetButton>
  );
}

export default EditableSheetButton;
