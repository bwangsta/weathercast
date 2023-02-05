function Footer() {
  const currentYear = new Date()
  return (
    <footer>
      <p> Copyright &copy; {currentYear.getFullYear()} bwangsta</p>
    </footer>
  )
}

export default Footer
