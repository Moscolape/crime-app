import './loading-component.styles.css';

const Loader = () => (
    <div className="center">
        <div className="ring"></div>
        <span id='load'>loading...</span>
    </div>
)

export default Loader;