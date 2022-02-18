import { HelloWorldRepository } from '../../repository/HelloWorld/HelloWorld.repository.js';
import helloWorldValidationSchema from './helloWorldValidationSchema.js';

export class HelloWorldService {
  static async getHelloWorld(req, res) {
    console.log('jestesmy w get');
    await HelloWorldRepository.getAll({}, (err, doc) => doc)
      .then((doc) => res.status(200).json(doc))

      .catch((err) => res.status(500).json({ message: `Server error: ${err}` }));
  }

  static async postHelloWorld(req, res) {
    const { error } = helloWorldValidationSchema.validate(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
    await HelloWorldRepository.post({}, (err, doc) => doc).then((doc) => res.status(200).json(doc));

    const hello = { name: req.body.name };

    res.status(200).json(hello);
  }
}
