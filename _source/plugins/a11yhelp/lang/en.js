/*
Copyright (c) 2003-2010, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.html or http://ckeditor.com/license
*/

CKEDITOR.plugins.setLang( 'a11yhelp', 'en',
{
	accessibilityHelp :
	{
		title : 'Accessibility Instructions',
		legend :
		[
			{
				name : 'General',
				items :
						[
							{
								name : 'Editor Toolbar',
								legend: 'Press ${toolbarFocus} to navigate to the toolbar; Move to next toolbar button with TAB or RIGHT ARROW; Move to previous button with  SHIFT+TAB or LEFT ARROW; Press SPACE or ENTER to trigger the toolbar button.'
							},

							{
								name : 'Editor Element Path Bar',
								legend : 'Press ${elementsPathFocus} to navigate to the elements path bar; Move to next element button with TAB or RIGHT ARROW; Move to previous button with  SHIFT+TAB or LEFT ARROW. Press SPACE or ENTER to select the element in editor.'
							},

							{
								name : 'Editor Context Menu',
								legend : 'Press ${contextMenu} or APPLICATION KEY to open context-menu. Then move to next menu option with TAB or DOWN ARROW; Move to previous option with  SHIFT+TAB or UP ARROW. Press SPACE or ENTER to select the menu option.' +
										 'Open sub-menu of current option wtih SPACE or ENTER or RIGHT ARROW; Go back to parent menu item with ESC or LEFT ARROW;' +
										 'Close context menu with ESC.'
							},

							{
								name : 'Editor Dialog',
								legend : 'Inside a dialog, press TAB to navigate to next dialog field, press SHIFT + TAB to move to previous field, press ENTER to submit dialog, press ESC to cancel dialog.' +
										 'For dialogs that have multiple tab pages, press ALT + F10 to navigate to tab-list. Then move to next tab with TAB OR RIGTH ARROW; Move to previous tab with SHIFT + TAB or LEFT ARROW. Press SPACE or ENTER to select the tab page.'
							},

							{
								name : 'Editor List Box',
								legend : 'Inside a list-box, move to next list item with TAB OR DOWN ARROW; Move to previous list item with SHIFT + TAB or UP ARROW. Press SPACE or ENTER to select the list option. Press ESC to close the list-box.'
							}
						]
			},
			{
				name : 'Commands',
				items :
						[
							{
								name : ' Undo command',
								legend : 'Press ${undo}'
							},
							{
								name : ' Redo command',
								legend : 'Press ${redo}'
							},
							{
								name : ' Bold command',
								legend : 'Press ${bold}'
							},
							{
								name : ' Italic command',
								legend : 'Press ${italic}'
							},
							{
								name : ' Underline command',
								legend : 'Press ${underline}'
							},
							{
								name : ' Link command',
								legend : 'Press ${link}'
							},
							{
								name : ' Toolbar Collapse command',
								legend : 'Press ${toolbarCollapse}'
							},
							{
								name : ' Accessibility Help',
								legend : 'Press ${a11yHelp}'
							}
						]
			}
		]
	}
});
