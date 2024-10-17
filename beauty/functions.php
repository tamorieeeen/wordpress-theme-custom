<?php //子テーマ用関数

add_filter( 'author_rewrite_rules', '__return_empty_array' );
function disable_author_archive() {
  if( preg_match( '#/author/.+#', $_SERVER['REQUEST_URI'] ) ){
    wp_redirect( esc_url( home_url( '/' ) ) );
    exit;
  }
}
add_action('init', 'disable_author_archive');
