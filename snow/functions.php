<?php //子テーマ用関数

// 著者のアーカイブページを閲覧不可にする
add_filter( 'author_rewrite_rules', '__return_empty_array' );
function disable_author_archive() {
  if( preg_match( '#/author/.+#', $_SERVER['REQUEST_URI'] ) ){
    wp_redirect( esc_url( home_url( '/' ) ) );
    exit;
  }
}
add_action('init', 'disable_author_archive');

//　ショートコードでカテゴリーの記事一覧が出せるようにする
function Cat_Post ( $arg = array ()) {
  extract ( shortcode_atts ( array ( 'category' => '1', 'posts_per_page' => '5' ), $arg ));
  $posts = get_posts ( array ( 'posts_per_page' => $posts_per_page, 'category' => $category ));
  $html = Html_Tag($posts);
  return $html;
}
add_shortcode('catpost', 'Cat_Post');
function Html_Tag ( $posts ) {
  $html = '<div class="catpost-list">';
  foreach ( $posts as $post ) {
    $html .= '<a href="' . get_permalink($post->ID) . '" class="catpost-child-atag"><div>';
    $html .= '<div class="img">' . get_the_post_thumbnail($post->ID, 'medium') . '</div>';
    $html .= '<div class="data">' . date ( 'Y.m.d', strtotime ( $post->post_date ) ) . '</div>';
    $html .= '<div class="title">' . $post->post_title . '</div>';
    $html .= '</div></a>';
  }
  $html .= '</div>';
  return $html;
}
