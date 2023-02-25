import styles from './layout.module.scss';

export const metadata = {
  title: 'Create new account',
};

export default function SignUpLayout({ children }) {
  return (
    <html className={styles.html} lang="en">
      <head />
      <body>
        <header>
          <nav>
            <ul>
              <li>About</li>
              <li>Find your groove </li>
              <li>Profile picture</li>
              <li>eng</li>
            </ul>
          </nav>
        </header>

        {children}
        <footer>
          <ul>
            <li>Twitter</li>
            <li>Instagram</li>
            <li>LinkedIn</li>
          </ul>
        </footer>
      </body>
    </html>
  );
}
