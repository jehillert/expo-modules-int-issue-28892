type PathOptions = {
  dir?: string;
  root?: string;
  base?: string;
  name?: string;
  ext?: string;
};

type Segment = string | string[] | Segment[];

const normalize = (path: string) => {
  const components: string[] = [];
  for (const component of `${path}`.split(/\/+/g)) {
    if (component == '.') {
    } else if (component == '..') {
      components.pop();
    } else {
      components.push(component);
    }
  }
  let normalized = (
    (path.startsWith('/') ? '/' : '') + components.join('/')
  ).replace(/\/\/+/g, '/');
  return normalized || '.';
};

const _basename = (path: string, ext: string) => {
  const basename = path.split(/\//g).pop();
  if (ext) {
    const tmp = basename!.split(/\./g);
    const _ext = tmp.pop();
    if (ext === _ext || ext.slice(1) === _ext) {
      return tmp.join('.');
    }
  }
  return basename;
};

const _dirname = (path: string) => path.split(/\//g).slice(0, -1).join('/');

const _extname = (path: string) => {
  const tmp = path.replace(/^[\.]+/, '');
  if (/\./.test(tmp)) {
    return tmp.match(/\.[^.]*$/)![0];
  }
  return '';
};

const format = (options: PathOptions) => {
  const { dir, root, base, name, ext } = options;
  const _dir = dir || root;
  const _base =
    base || `${name || ''}${ext && /^\./.test(ext) ? '' : '.'}${ext || ''}`;
  return normalize(`${_dir}/${_base}`);
};

const isAbsolute = (path: string) => {
  return /^\//.test(path);
};

const _parse = (path: string) => {
  const options: PathOptions = {};
  const components = path.split(/\//g);
  options.base = components.pop();
  options.dir = components.join('/');
  if (/^\//.test(options.dir)) {
    options.root = '/';
  }
  if (options.base != undefined) {
    const tmp = options.base.replace(/^[\.]+/, '');
    if (/\./.test(tmp)) {
      options.ext = tmp.match(/\.[^.]*$/)![0];
      options.name = options.base.slice(0, -options.ext!.length);
    } else {
      options.name = options.base;
    }
  } else {
    delete options.base;
  }
  return options;
};

const _flatten = (segment: Segment): string[] => {
  if (!Array.isArray(segment)) {
    return [segment];
  }
  let flatten: string[] = [];
  for (const seg of segment) {
    flatten = flatten.concat(_flatten(seg));
  }
  return flatten;
};

const resolve = (...segments: Segment[]) => {
  const flatten = _flatten(segments).reduce((previous, current) => {
    if (/^\//.test(current)) {
      return current;
    }
    return `${previous}/${current}`;
  });
  return normalize(flatten);
};

const _relative = (base: string, path: string) => {
  const _base = base.split(/\//g);
  const _path = path.split(/\//g);

  while (_base[0] === _path[0]) {
    _base.shift();
    _path.shift();
  }

  return Array(base.length).fill('..').concat(path).join('/');
};

const basename = (path: string, ext: string) => _basename(normalize(path), ext);

const dirname = (path: string) => _dirname(normalize(path));

const extname = (path: string) => _extname(normalize(path));

const parse = (path: string) => _parse(normalize(path));

const relative = (base: string, path: string) =>
  _relative(normalize(base), normalize(path));

const path = {
  normalize,
  basename,
  dirname,
  extname,
  parse,
  format,
  resolve,
  relative,
  isAbsolute,
};

// RUNNABLE EXAMPLE
// const result = path.parse('/dogs.png');
// console.log(JSON.stringify(result, undefined, 2));

export {
  basename,
  dirname,
  extname,
  format,
  isAbsolute,
  parse,
  relative,
  resolve,
};

export default path;
