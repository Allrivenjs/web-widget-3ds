import { h } from 'preact';

export const LinkInfo = ({ linkData  } : any) => {
    if (!linkData) {
        return null;
    }

    const { link, title, description, image, domain } = linkData;

    return (
        <div>
            <h2>{title}</h2>
            <p>{description}</p>
            <img src={image} alt={title} />
            <p>Enlace: <a href={link} target="_blank" rel="noopener noreferrer">{link}</a></p>
            <p>Dominio: {domain}</p>
        </div>
    );
};
