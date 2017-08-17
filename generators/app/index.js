const Generator = require('yeoman-generator');

module.exports = class extends Generator {
    // The name `constructor` is important here
    constructor(args, opts) {
        // Calling the super constructor is important so our generator is correctly set up
        super(args, opts);

        // Next, add your custom code
        this.option('verbose', {alias: "v"});
        this.config.save();
    }

    prompting() {
        return this.prompt([
            {
                type: 'list',
                name: 'templateLanguage',
                message: "What template language would you like to use?",
                choices: ['mustache', 'nunjucks']
            }
        ]).then((answers) => {
            this.config.set('templateLanguage', answers.templateLanguage)

        })
    }

    writing() {
        this.fs.copyTpl(this.templatePath('package.json'), this.destinationPath('package.json'));
        this.fs.copyTpl(this.templatePath('app.js.ejs'), this.destinationPath('app.js'), {templateLanguage: this.config.get('templateLanguage')});
    }

    install() {
        this.installDependencies({npm: false, yarn: true, bower: false})
    }

    installingExpress() {
        this.yarnInstall(['express']);
    }

    installingTemplateLanguage() {
        const language = this.config.get('templateLanguage');
        if (language === 'mustache') {
            this.yarnInstall(['express-mustache']);
        } else if (language === 'nunjucks') {
            this.yarnInstall(['nunjucks']);
        }
    }
};
