import { forwardRef } from 'react'

const ButtonDBO = forwardRef((props: any, ref: any) => {
  return (
    <button
      ref={ref}
      type={props.type || 'button'}
      className={`btn ${props.classBg}`}
      onClick={props.click || null}
      style={props.customStyle || null}
      disabled={props.disabled || false}
      onMouseOut={props.onMouseOut}
      onMouseOver={props.onMouseOver}
    >
      <div className='d-flex align-items-center'>
        {
          props.loading
            ? <>
              <span className='spinner-grow spinner-grow-sm' role='status' aria-hidden='true' />
              <span>&nbsp;&nbsp;Loading...</span>
              </>
            : <>
              {props.text && <p className='mb-0 mx-2'>{props.text}</p>}
              {props.icon}
              </>
        }
      </div>
    </button>
  )
})

export default ButtonDBO
