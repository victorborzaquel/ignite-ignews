import { useRouter } from "next/router";
import Link, { LinkProps } from 'next/link'
import { cloneElement, ReactElement } from "react";

interface ActiveLinkProps extends LinkProps {
  children: ReactElement;
  activeClassName: string;
}

export function ActiveLink({ children, activeClassName, ...rest }: ActiveLinkProps) {
  const { asPath } = useRouter()
  const { href } = rest

  const className = asPath === href ? activeClassName : ''

  return (
    <Link href='/' className={className} {...rest}>
      {cloneElement(children, { className })}
    </Link>
  )
}