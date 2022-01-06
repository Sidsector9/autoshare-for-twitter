const slug = 'autoshare-for-twitter';

describe( 'Tests that new post is not tweeted when box is unchecked', () => {
	it( 'Autoshare disable default', () => {
		cy.visitAdminPage( 'options-general.php?page=autoshare-for-twitter' );
		cy.wait( 5000 );
		cy.get( 'input[name="autoshare-for-twitter[enable_default]"]' ).eq( 1 ).click();
		cy.get( '#submit' ).click();
	} );

	it( 'Tests that new post is not tweeted when box is unchecked', () => {
		cy.visitAdminPage( 'post-new.php' );
		cy.get( 'button[aria-label="Close dialog"' ).click();
		cy.get( '#post-title-0' ).type( 'Text' );

		cy.get( '[aria-disabled="false"].editor-post-publish-panel__toggle', { timeout: 10000 } ).should( 'be.visible' );
		cy.get( '.editor-post-publish-panel__toggle' ).click();
		cy.wait( 5000 );

		// Pre-publish.
		cy.get( '[aria-disabled="false"].editor-post-publish-button', { timeout: 10000 } ).should( 'be.visible' );
		cy.get( '.editor-post-publish-button' ).click();

		// Post-publish.
		cy.get( '.autoshare-for-twitter-post-status', { timeout: 10000 } ).should( 'be.visible' );
		cy.get( '.autoshare-for-twitter-post-status' ).contains( 'This post was not tweeted.' );
	} );
} );

describe( 'Tests that new post is tweeted when box is checked', () => {
	it( 'Tests that new post is tweeted when box is checked', () => {
		cy.visitAdminPage( 'post-new.php' );
		cy.get( 'button[aria-label="Close dialog"' ).click();
		cy.get( '#post-title-0' ).type( 'Random Post Title' );

		cy.get( '[aria-disabled="false"].editor-post-publish-panel__toggle', { timeout: 10000 } ).should( 'be.visible' );
		cy.get( '.editor-post-publish-panel__toggle' ).click();
		cy.wait( 5000 );

		// cy.get('.autoshare-for-twitter-prepublish__checkbox-row').parent('components-panel__body').click();
		cy.get('.components-panel__body:nth-child(7) .editor-post-publish-panel__link').click();
		cy.get('.is-opened .editor-post-publish-panel__link').click();


		// cy.get( '.autoshare-for-twitter-prepublish__checkbox-label', { timeout: 10000 } ).should( 'be.visible' );
		cy.get( '.autoshare-for-twitter-prepublish__checkbox-label' ).click();
		cy.wait( 5000 );

		// Pre-publish.
		cy.get( '[aria-disabled="false"].editor-post-publish-button', { timeout: 10000 } ).should( 'be.visible' );
		cy.get( '.editor-post-publish-button' ).click();

		// Post-publish.
		cy.get( '.autoshare-for-twitter-post-status', { timeout: 10000 } ).should( 'be.visible' );
		cy.get( '.autoshare-for-twitter-post-status' ).contains( 'Tweeted on' );
	} );
} );