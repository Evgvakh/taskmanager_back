import jwt from 'jsonwebtoken'

export default (req, res, next) => {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');    
    console.log(token)
    if (token) {
        try {
            const decodedToken = jwt.verify(token, 'tskmngrevgvakh');
            req.userId = decodedToken.id;
            req.userRole = decodedToken.role;
            console.log(req.userId, req.userRole, decodedToken);
            next();
        } catch (err) {
            return res.send(err)
        }
    } else {
        return res.status(403).send('No aceess')
    }    
} 