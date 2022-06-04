import { useEffect, useRef, useState } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { onLogout } from '../store/user/user.action.js'

import logoLight from '../assets/imgs/logo-horizontal-white.png'
import logoDark from '../assets/imgs/logo-horizontal-dark.png'

import { FiChevronDown } from 'react-icons/fi'


export const AppHeader = () => {

  const [isScrolled, setIsScrolled] = useState(false)
  const { user } = useSelector(({ userModule }) => userModule)
  const { pathname } = useLocation()
  const profileRef = useRef()
  const dispatch = useDispatch()

  const isHome = pathname === '/'

  useEffect(() => {
    if (isHome) window.addEventListener('scroll', checkScroll)
    return () => { window.removeEventListener('scroll', checkScroll) }
  }, [isHome])

  const checkScroll = () => {
    if (window.pageYOffset > 0) return setIsScrolled(true)
    setIsScrolled(false)
  }

  if (pathname === '/login' || pathname === '/signup') return

  const isBoard = (pathname.includes('/board'))
  const initials = (user) => ([...user.fullname])

  const getClassName = () => {
    let className
    if (isHome) {
      className = 'home'
      if (window.pageYOffset > 0) className += ' scrolled'
      return className
    }
    if (isBoard) className = 'board'
    else className = 'general'
    return className
  }

  const logout = async () => {
    dispatch(onLogout())
  }

  return (
    <header className={`app-header ${getClassName()} ${isScrolled ? 'scrolled' : ''}`}>
      <nav className='link-container'>
        <div className='logo-container'>
          <Link to='/'>
            {
              isHome ?
                <img src={logoDark} alt="tusk-logo" className='logo' />
                :
                <img src={logoLight} alt="tusk-logo" className='logo smaller' />
            }
          </Link>
        </div>
        {!isHome && <Link className='workspace-link' to='/workspace'>Workspace <FiChevronDown /></Link>}
        {!isHome && <div className='workspace-link' >Recent <FiChevronDown /></div>}
        {!isHome && <div className='workspace-link' >Starred <FiChevronDown /></div>}
        {!isHome && <div className='workspace-create' >Create</div>}

      </nav>
      {
        isHome &&
        <nav className='login-signup-container'>
          <Link to='/login' className='login'>Log in</Link>
          <Link to='/signup' className='signup'>Sign up</Link>
        </nav>
      }
      {
        !isHome &&
        <div className='user-img-container' onClick={logout} ref={profileRef}>
          {user &&
            (user?.imgURL
              ? <span className="user-img" style={{ backgroundImage: `url('${user.imgURL}')` }}></span>
              : <span className="user-initial" >{`${initials(user)[0]}${initials(user)[1]}`}</span>)
          }
          {!user && <span className="user-initial" ></span>}
        </div>
      }
    </header >
  )
}