import cuid from 'cuid';
 
export function getId() {
    return cuid();
}