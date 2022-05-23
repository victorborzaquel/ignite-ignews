import { ActiveLink } from './ActiveLink'
import { SignInButton } from './SignInButton'
import styles from './styles.module.scss'

export function Header() {
  return (
    <header className={styles.HeaderContainer}>
      <div className={styles.HeaderContent}>
        <img src="/images/logo.svg" alt="ig.news" />

        <nav>
          <ActiveLink href='/' activeClassName={styles.active}>
            <a className={styles.active}>Home</a>
          </ActiveLink>

          <ActiveLink href='/posts' activeClassName={styles.active} prefetch>
            <a>Posts</a>
          </ActiveLink>
        </nav>

        <SignInButton />
      </div>
    </header>
  )
}