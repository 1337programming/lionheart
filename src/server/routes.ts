import Auth from './auth';
import User from './user';
import Namespace from './namespace';
import Content from './content';

//TODO import Express() interface
export default function (app:any) {
  app.use('/api/users', Auth);
  app.use('/auth', User);
  app.use('/namespace', Namespace);
  app.use('/content', Content);
  app.get('/', function (req, res) {
    res.sendFile(__dirname + '/' + 'static/index.html');
  });
}