import { NavLink } from 'react-router-dom'

const Navbar = () => {
    return (
        <nav className='navbar'>
            <NavLink
                className='link parent-item capitalize nav-link'
                to="home">Home</NavLink >
            <NavLink
                className='link parent-item capitalize nav-link'
                to="AddCandidate">Add Candidate</NavLink >
            <NavLink
                className='link parent-item capitalize nav-link'
                to="ListCandidates">List of Candidates</NavLink >
            <NavLink
                className='link parent-item capitalize nav-link'
                to="offers">List Offers</NavLink >
        </nav>
    )
}

export default Navbar