<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://wordpress.org/support/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'fictionaluni' );

/** MySQL database username */
define( 'DB_USER', 'root' );

/** MySQL database password */
define( 'DB_PASSWORD', '' );

/** MySQL hostname */
define( 'DB_HOST', 'localhost' );

/** Database Charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The Database Collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         '!API? 0:o!8a,DZ3d0B^TYW%sg9dFx]<p/P?!V0EzQ1W[XP~~(`1zH5L^+G,tT1T' );
define( 'SECURE_AUTH_KEY',  '0*R+(`YbZMRR>7C6+muS$g|hX3wNEpZ1lpw]#&`QOm+Rc.d+U9]?u+Z#LltwT9~ ' );
define( 'LOGGED_IN_KEY',    ';s|7a8AFj4kp )o(JdzD~tYV6L9V1gzT0^_NDBDA2sT# y-X1tF=mkF|_IE 8^YE' );
define( 'NONCE_KEY',        'Jkt@8_E>~J}j)Akph+Oa(6Ll~GFi`?tIBK?m[ubP32=oIQ1N8(_U1WsIWFn`v30m' );
define( 'AUTH_SALT',        'eR2L/9&&AW:o-9pijxc#HyO?No!PT/x6-FeZ+qS?0z[Az!np+pSF;3Ibl; aJ4$y' );
define( 'SECURE_AUTH_SALT', 'MZ.*lq*&gEo_&$9Jdk|74aJvH-6AazN)y1N{;YeqS_3T^5.4p;;l#_#iYQugk/F~' );
define( 'LOGGED_IN_SALT',   '/D/Rj:<Z!3iP-m{&sCCCBhLh$Jv/1],uJdgFj%KSF;)O|P*S-7*X!J~Q-37RrbvQ' );
define( 'NONCE_SALT',       'sWA>H1@yf-2`oM1;d8AqY%kF66ysrtN),HQ*PFT{TKt7Lo]l`2Sws0[S<W#(#UoY' );

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/support/article/debugging-in-wordpress/
 */
define( 'WP_DEBUG', false );

/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
