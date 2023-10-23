import React, {useState, useImperativeHandle ,forwardRef} from 'react'
import PropTypes from 'prop-types'

const Togglable = forwardRef(({children, btnLabel = 'Muestrame algo como DefaultValue'}, ref) => {
	const [visible, setVisible] = useState(false)

	const hideWhenVisible = { display: visible ? 'none' : ''}
	const showWhenVisible = { display: visible ? '' : 'none'}

	const toggleVisibility = () => setVisible(!visible)

	useImperativeHandle(ref, () => {
		return {
			toggleVisibility
		}
	})

	return (
		<div>
			<div style={hideWhenVisible}>
				<button onClick={toggleVisibility}>{btnLabel}</button>
			</div>

			<div style={showWhenVisible}>
				<button onClick={toggleVisibility}>HIDE</button>
				{children}
			</div>

		</div>
	)
})

Togglable.displayName = 'Toggleable';

Togglable.propTypes = {
	btnLabel: PropTypes.string.isRequired
}

export default Togglable