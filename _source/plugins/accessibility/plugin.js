/*
Copyright (c) 2003-2010, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.html or http://ckeditor.com/license
*/

/**
 * @fileOverview Bring better accessibility support to browsers that has limited support for modern technologies (e.g. ARIA).
 */

( function()
{
	var dtd = CKEDITOR.dtd,
		 env = CKEDITOR.env;
	// List of in-use ARIA roles and states. 
	var roles = [ 'role' ],
		 // List of roles that role type should not be announced.
		 silentRoles = { 'region' : 1 },
		 states = [ 'label', 'labelledby', 'describedby', 'multiline' ],
		 length = Math.max( roles.length, states.length );

	function lookupARIASupport( role, tagName )
	{
		return {
			'dialog' :	 env.gecko && CKEDITOR.env.version >= 10900,
			'region' : env.gecko && CKEDITOR.env.version >= 10900
		}[ role ];
	}

	/**
	 *  Bring degradeable substitution to standard ARIA widgets.  
	 * @param element
	 */
	function degradeARIA( element, editor )
	{
		// Save the interested ARIA attributes first.
		var doc = element.getDocument(),
				role = element.getAttribute( 'role' ) || '';

		// Just leave the original element untouched if
		// the role is already supported on it.
		if( lookupARIASupport( role, element.getName() ) !== false )
			return element;

		var attrValue,
			 labelText = element.getAttribute( 'aria-label' ) || ( attrValue = element.getAttribute( 'aria-labelledby' ) ) && doc.getById( attrValue ).getText() || '',
			 descriptionText = ( attrValue = element.getAttribute( 'aria-describedby' ) ) && doc.getById( attrValue ).getText() || '',
			 allInOne = [ labelText, role in silentRoles ? '' : role, descriptionText ].join( ' ' );

		// Remove all ARIA attributes on the widget that could
		// bring down or conflict with the degradtion label.
		for ( var i = 0; i < length; i++ )
		{
			roles[ i ] && element.removeAttribute( roles[ i ] );
			states[ i ] && element.removeAttribute( 'aria-' + states[ i ] );
		}

		// Translate 'dialog' role by wrapping all containing form fields with a legend that composed of all ARIA
		// attributes of the dialog which leads to be announced by ATs.
		if( role == 'dialog' )
		{
			var fieldset = CKEDITOR.dom.element.createFromHtml(
					'<fieldset class="cke_voicelabel_invisible">' +
						'<legend class="cke_voicelabel_invisible">' +
							CKEDITOR.tools.htmlEncode( allInOne ) +
						'</legend>' +
					'</fieldset>', doc );

			var parent;
			while( ( parent = element.getParent() ) && !parent.getDtd()[ fieldset.getName() ] )
				element = parent;
			fieldset.insertBefore( element );
			fieldset.append( element );
			return fieldset;
		}
		// The only reliable substitution of aria-label on an iframe
		// is to use the content window title of that frame.
		else if ( element.is( 'iframe' ) )
		{
			// We can only occupy the title when editor is not in full-page mode.
			!editor.config.fullPage &&
				( element.$.contentWindow.document.title = allInOne );
		}
	}

	CKEDITOR.plugins.add( 'accessibility',
	{
		init : function( editor )
		{
			editor.on( 'ariaWidget', function( evt )
			{
				degradeARIA( evt.data, editor );
			} );

			if( !( env.gecko && env.version >= 10900 ) )
			{
				var uiButtonProto = CKEDITOR.ui.button.prototype;
				uiButtonProto.setState = CKEDITOR.tools.override( uiButtonProto.setState, function( org )
				{
					return function( state )
					{
						if( org.apply( this, arguments ) )
						{
							var element = CKEDITOR.document.getById( this._.id ),
								htmlTitle = this.title,
								unavailableLabel = this._.editor.lang.common.unavailable,
								labelElement = element.getChild( 1 );

							state == CKEDITOR.TRISTATE_DISABLED && ( htmlTitle = unavailableLabel.replace( '%1', this.title ) );
							labelElement.setHtml( htmlTitle );
						}
					}
				} );
			}
		}
	});

} )();
