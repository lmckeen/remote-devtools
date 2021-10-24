module.exports = {
  env: {
    browser: true,
    node: true,
    es2021: true
  },
  extends: 'eslint:recommended',
  parserOptions: {
    ecmaVersion: 13,
    sourceType: 'module'
  },
  rules: {
    // Possible Problems
    'no-duplicate-imports': 'error',
    'no-promise-executor-return': 'error',
    'no-self-compare': 'error',
    'no-template-curly-in-string': 'error',
    'no-unmodified-loop-condition': 'error',
    'no-unused-private-class-members': 'error',
    'no-use-before-define': ['error', {
      functions: false,
      classes: true,
      variables: true 
    }],
    'require-atomic-updates': 'error',

    // Suggestions
    'accessor-pairs': 'error',
    'arrow-body-style': ['error', 'as-needed'],
    'block-scoped-var': 'error',
    'camelcase': 'error',
    'consistent-return': 'error',
    'consistent-this': ['error', 'that'],
    'curly': 'error',
    'default-case': 'error',
    'default-case-last': 'error',
    'dot-notation': 'error',
    'eqeqeq': 'error',
    'func-name-matching': 'error',
    'func-names': ['error', 'always'],
    'func-style': ['error', 'declaration'],
    'grouped-accessor-pairs': 'error',
    'id-length': ['error', {
      min: 2,
      max: 20 
    }],
    'max-classes-per-file': ['error', 2],
    'max-depth': ['error', 4],
    'max-lines': ['error', 300],
    'max-lines-per-function': ['error', 75],
    'max-nested-callbacks': ['error', 4],
    'max-params': ['error', 4],
    'multiline-comment-style': ['error', 'starred-block'],
    'new-cap': ['error', { newIsCap: true }],
    'no-alert': 'error',
    'no-array-constructor': 'error',
    'no-bitwise': 'error',
    'no-caller': 'error',
    'no-confusing-arrow': 'error',
    'no-div-regex': 'error',
    'no-else-return': 'error',
    'no-eq-null': 'error',
    'no-eval': 'error',
    'no-extend-native': 'error',
    'no-extra-bind': 'error',
    'no-extra-boolean-cast': 'error',
    'no-extra-label': 'error',
    'no-extra-semi': 'error',
    'no-floating-decimal': 'error',
    'no-implied-eval': 'error',
    'no-iterator': 'error',
    'no-label-var': 'error',
    'no-labels': 'error',
    'no-lonely-if': 'error',
    'no-loop-func': 'error',
    'no-multi-assign': 'error',
    'no-multi-str': 'error',
    'no-negated-condition': 'error',
    'no-nested-ternary': 'error',
    'no-new': 'error',
    'no-new-object': 'error',
    'no-octal-escape': 'error',
    'no-param-reassign': 'error',
    'no-proto': 'error',
    'no-redeclare': 'error',
    'no-regex-spaces': 'error',
    'no-return-assign': 'error',
    'no-return-await': 'error',
    'no-script-url': 'error',
    'no-sequences': 'error',
    'no-shadow': 'error',
    'no-throw-literal': 'error',
    'no-undef-init': 'error',
    'no-underscore-dangle': 'error',
    'no-unneeded-ternary': 'error',
    'no-unused-expressions': 'error',
    'no-useless-computed-key': 'error',
    'no-useless-concat': 'error',
    'no-useless-constructor': 'error',
    'no-useless-escape': 'error',
    'no-useless-rename': 'error',
    'no-useless-return': 'error',
    'no-var': 'error',
    'no-with': 'error',
    'object-shorthand': 'error',
    'prefer-arrow-callback': 'error',
    'prefer-const': 'error',
    'prefer-object-spread': 'error',
    'prefer-promise-reject-errors': 'error',
    'prefer-regex-literals': 'error',
    'prefer-rest-params': 'error',
    'prefer-spread': 'error',
    'prefer-template': 'error',
    'quote-props': ['error', 'consistent-as-needed'],
    'require-await': 'error',
    'require-yield': 'error',
    'sort-imports': ['error', {
      ignoreCase: false,
      ignoreDeclarationSort: false,
      ignoreMemberSort: false,
      memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
      allowSeparatedGroups: false
    }],
    'spaced-comment': ['error', 'always'],
    'strict': ['error', 'global'],
    'symbol-description': 'error',
    'vars-on-top': 'error',
    'yoda': ['error', 'never'],

    // Layout and Formatting
    'array-element-newline': ['error', 'consistent'],
    'array-bracket-newline': ['error', 'consistent'],
    'array-bracket-spacing': ['error', 'never'],
    'arrow-parens': ['error', 'as-needed'],
    'arrow-spacing': ['error', {
      before: true,
      after: true 
    }],
    'block-spacing': ['error', 'always'],
    'brace-style': ['error', '1tbs'],
    'comma-dangle': ['error', 'never'],
    'comma-spacing': ['error', {
      before: false,
      after: true 
    }],
    'comma-style': ['error', 'last'],
    'computed-property-spacing': ['error', 'never'],
    'dot-location': ['error', 'property'],
    'eol-last': ['error', 'always'],
    'func-call-spacing': ['error', 'never'],
    'function-call-argument-newline': ['error', 'consistent'],
    'function-paren-newline': ['error', 'multiline'],
    'generator-star-spacing': ['error', {
      before: false,
      after: true 
    }],
    'implicit-arrow-linebreak': ['error', 'beside'],
    'indent': ['error', 2, { SwitchCase: 1 }],
    'key-spacing': ['error', { beforeColon: false }],
    'keyword-spacing': ['error', {
      before: true,
      after: true 
    }],
    'line-comment-position': ['error', { position: 'above' }],
    'lines-around-comment': ['error', { beforeBlockComment: true }],
    'lines-between-class-members': ['error', 'always'],
    'max-len': ['error', {
      code: 120,
      ignoreUrls: true 
    }],
    'max-statements-per-line': ['error', { max: 1 }],
    'multiline-ternary': ['error', 'never'],
    'new-parens': 'error',
    'newline-per-chained-call': ['error', { ignoreChainWithDepth: 2 }],
    'no-extra-parens': 'error',
    'no-multi-spaces': 'error',
    'no-multiple-empty-lines': 'error',
    'no-whitespace-before-property': 'error',
    'object-curly-newline': ['error', {
      consistent: true,
      multiline: true 
    }],
    'object-curly-spacing': ['error', 'always'],
    'object-property-newline': 'error',
    'operator-linebreak': ['error', 'after'],
    'padded-blocks': ['error', 'never'],
    'padding-line-between-statements': [
      'error',
      {
        blankLine: 'always',
        prev: ['const', 'let', 'var', 'import'],
        next: '*' 
      },
      {
        blankLine: 'any',
        prev: ['const', 'let', 'var', 'import'],
        next: ['const', 'let', 'var', 'import'] 
      }
    ],
    'quotes': ['error', 'single', { allowTemplateLiterals: true }],
    'rest-spread-spacing': ['error', 'never'],
    'semi': ['error', 'never'],
    'semi-style': ['error', 'first'],
    'space-before-blocks': 'error',
    'space-before-function-paren': ['error', 'never'],
    'space-in-parens': ['error', 'never'],
    'switch-colon-spacing': 'error',
    'template-curly-spacing': 'error',
    'template-tag-spacing': 'error'
  },
  overrides: [
    {
      files: ['.eslintrc.cjs'],
      rules: {
        'id-length': 'off'
      }
    },
    {
      // file and rules for es5
      files: ['src/client/client.js', 'src/redirect/redirect.js'],
      rules: {
        'no-var': 'off',
        'prefer-template': 'off',
        'prefer-rest-params': 'off',
        'prefer-arrow-callback': 'off',
        'no-restricted-syntax': ['error', {
          selector: 'VariableDeclaration[kind=\'let\']',
          message: 'let keyword is not allowed.'
        }, {
          selector: 'VariableDeclaration[kind=\'const\']',
          message: 'const keyword is not allowed.'
        }, {
          selector: 'ClassDeclaration',
          message: 'classes are not allowed.'
        }, {
          selector: 'Super',
          message: 'super keyword is not allowed.'
        }, {
          selector: 'SpreadElement',
          message: 'SpreadElement is not allowed.'
        }, {
          selector: 'ForOfStatement',
          message: 'for of loops are not allowed.'
        }, {
          selector: 'TemplateLiteral',
          message: 'template literals are not allowed.'
        }, {
          selector: 'ArrowFunctionExpression',
          message: 'arrow functions are not allowed.'
        }, {
          selector: 'YieldExpression',
          message: 'yield keyword is not allowed.'
        }, {
          selector: 'ModuleDeclaration',
          message: 'import and export are not allowed.'
        }, {
          selector: 'BinaryOperator',
          message: 'BinaryOperator is not allowed.'
        }, {
          selector: 'AssignmentOperator',
          message: 'AssignmentOperator is not allowed.'
        }, {
          selector: 'AwaitExpression',
          message: 'Async/Await is not allowed.'
        }, {
          selector: 'FunctionDeclaration[async=true]',
          message: 'Async/Await is not allowed.'
        }, {
          selector: 'RestElement',
          message: 'RestElement is not allowed.'
        }, {
          selector: 'LogicalExpression[operator=\'??\']',
          message: 'Nullish Coalescing is not allowed.'
        }, {
          selector: 'MemberExpression[optional=true]',
          message: 'Optional chaining is not allowed.'
        }, {
          selector: 'Identifier[name=\'fetch\']',
          message: 'fetch keyword is not allowed.'
        }]
      }
    }
  ],
  ignorePatterns: ['node_modules', 'dist']
}
