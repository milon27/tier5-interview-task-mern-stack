import { NavLink } from 'react-router-dom'
import { createReactNavLink } from '@milon27/react-sidebar'
import { BsGrid, BsPeople } from 'react-icons/bs'
import URL from '../../utils/constant/URL'

const NavItems: (() => JSX.Element)[] = [
    createReactNavLink(NavLink, "Home", URL.HOME, <BsGrid />),
    createReactNavLink(NavLink, "Add User", URL.ADD_USER, <BsPeople />),
]

export default NavItems