import ContentLoader from 'react-content-loader';

const UserLoader = () => (

    <ContentLoader
        speed={2}
        width={900}
        height={160}
        viewBox="0 0 800 160"
        backgroundColor="#d9d9d9"
        foregroundColor="#ededed">

        <rect x="50" y="6" rx="4" ry="4" width="900" height="38" />
        <rect x="8" y="6" rx="4" ry="4" width="35" height="38" />
        <rect x="50" y="55" rx="4" ry="4" width="900" height="38" />
        <rect x="8" y="55" rx="4" ry="4" width="35" height="38" />
        <rect x="50" y="104" rx="4" ry="4" width="900" height="38" />
        <rect x="8" y="104" rx="4" ry="4" width="35" height="38" />

    </ContentLoader>

);

export default UserLoader;