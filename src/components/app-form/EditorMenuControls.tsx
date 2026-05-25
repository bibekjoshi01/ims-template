import { useTheme } from '@mui/material';
import {
  MenuControlsContainer,
  MenuDivider,
  isTouchDevice,
  MenuSelectHeading,
  MenuSelectFontSize,
  MenuSelectFontFamily,
  MenuSelectTextAlign,
  MenuButtonBold,
  MenuButtonItalic,
  MenuButtonUnderline,
  MenuButtonStrikethrough,
  MenuButtonSubscript,
  MenuButtonSuperscript,
  MenuButtonTextColor,
  MenuButtonHighlightColor,
  MenuButtonEditLink,
  MenuButtonOrderedList,
  MenuButtonBulletedList,
  MenuButtonTaskList,
  MenuButtonIndent,
  MenuButtonUnindent,
  MenuButtonBlockquote,
  MenuButtonCode,
  MenuButtonCodeBlock,
  MenuButtonHorizontalRule,
  MenuButtonRemoveFormatting,
  MenuButtonUndo,
  MenuButtonRedo
} from 'mui-tiptap';

export default function EditorMenuControls() {
  const theme = useTheme();

  return (
    <MenuControlsContainer>
      {/* Headings */}
      <MenuSelectHeading />
      <MenuDivider />

      {/* Font options */}
      <MenuSelectFontSize />
      <MenuSelectFontFamily
        options={[
          { value: 'Arial', label: 'Arial' },
          { value: 'Courier New', label: 'Courier New' },
          { value: 'Georgia', label: 'Georgia' },
          { value: 'Times New Roman', label: 'Times New Roman' },
          { value: 'Verdana', label: 'Verdana' }
        ]}
      />
      <MenuDivider />

      {/* Text styles */}
      <MenuButtonBold />
      <MenuButtonItalic />
      <MenuButtonUnderline />
      <MenuButtonStrikethrough />
      <MenuButtonSubscript />
      <MenuButtonSuperscript />
      <MenuDivider />

      {/* Colors */}
      <MenuButtonTextColor
        defaultTextColor={theme.palette.text.primary}
        swatchColors={[
          { value: '#000000', label: 'Black' },
          { value: '#ffffff', label: 'White' },
          { value: '#888888', label: 'Grey' },
          { value: '#ff0000', label: 'Red' },
          { value: '#ff9900', label: 'Orange' },
          { value: '#ffff00', label: 'Yellow' },
          { value: '#00d000', label: 'Green' },
          { value: '#0000ff', label: 'Blue' }
        ]}
      />
      <MenuButtonHighlightColor
        swatchColors={[
          { value: '#595959', label: 'Dark grey' },
          { value: '#dddddd', label: 'Light grey' },
          { value: '#ffa6a6', label: 'Light red' },
          { value: '#ffd699', label: 'Light orange' },
          { value: '#ffff00', label: 'Yellow' },
          { value: '#99cc99', label: 'Light green' },
          { value: '#90c6ff', label: 'Light blue' },
          { value: '#8085e9', label: 'Light purple' }
        ]}
      />
      <MenuDivider />

      {/* Links and alignment */}
      <MenuButtonEditLink />
      <MenuSelectTextAlign />
      <MenuDivider />

      {/* Lists */}
      <MenuButtonOrderedList />
      <MenuButtonBulletedList />
      <MenuButtonTaskList />
      {isTouchDevice() && (
        <>
          <MenuButtonIndent />
          <MenuButtonUnindent />
        </>
      )}
      <MenuDivider />

      {/* Blocks */}
      <MenuButtonBlockquote />
      <MenuButtonCode />
      <MenuButtonCodeBlock />
      <MenuButtonHorizontalRule />
      {/* Removed MenuButtonAddTable and its divider */}

      <MenuDivider />

      {/* Utilities */}
      <MenuButtonRemoveFormatting />
      <MenuButtonUndo />
      <MenuButtonRedo />
    </MenuControlsContainer>
  );
}
