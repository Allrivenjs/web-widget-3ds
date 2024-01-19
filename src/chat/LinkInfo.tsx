import { h } from 'preact';

export const startsWithCustom = (str: string, search: string, rawPos: number = 0): boolean => {
    const pos = rawPos > 0 ? rawPos | 0 : 0;
    return str.substring(pos, pos + search.length) === search;
};

export const LinkInfo = ({ linkData  } : {
    linkData: {
        link: string;
        title: string;
        description: string;
        image: string;
        domain: string;
    }
}) => {
    if (!linkData) {
        return null;
    }


    const { link, title, description, image, domain } = linkData;
    const imageSrc = 'https://' + (startsWithCustom(image, 'http://' ) ||  startsWithCustom(image, 'https://' ) ? '' : domain) + String(image).replace(/\/\//g, '/');

    return (
        <a style={{
            textDecoration: 'none',
            backgroundColor: 'transparent'
        }} href={link} target="_blank" rel="noopener noreferrer">
            <div style={{
                flex: '1 1 auto',
                minHeight: '1px',
                padding: '.05rem',
                marginTop: '1rem'
            }}>
                <div style={{
                    flexDirection: 'row',
                    display: 'flex',
                    minWidth: '0',
                    backgroundColor: '#fff',
                    backgroundClip: 'border-box',
                    border: '1px solid rgba(0,0,0,.125)',
                    borderRadius: '.25rem'
                }}>
                    <img style={{
                        width: '5rem',
                        height: '5rem',
                        borderRadius: 'calc(.25rem - 1px) 0 0 calc(.25rem - 1px)',
                        borderStyle: 'none'
                    }} src={imageSrc} alt={title}/>
                    <div style={{
                        flex: '1 1 auto',
                        minHeight: '1px',
                        display: 'flex',
                        flexDirection: 'column',
                        paddingLeft: '.2rem',
                        justifyContent: 'space-around'
                    }}>
                        <h4 style={{
                            fontSize: '1.25em',
                            fontWeight: '500',
                            lineHeight: '1.2',
                            margin: '0',
                            color: 'black'
                        }}>{title}</h4>
                        {description && <p>{description}</p>}
                    </div>
                </div>
            </div>
        </a>
    );
};
