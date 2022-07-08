export default {
  equals(obj1, obj2, field) {
    if (field)
      return (
        this.resolveFieldData(obj1, field) ===
        this.resolveFieldData(obj2, field)
      );
    else return this.deepEquals(obj1, obj2);
  },

  deepEquals(a, b) {
    if (a === b) return true;

    if (a && b && typeof a == 'object' && typeof b == 'object') {
      let arrA = Array.isArray(a),
        arrB = Array.isArray(b),
        i,
        length,
        key;

      if (arrA && arrB) {
        length = a.length;
        if (length != b.length) return false;
        for (i = length; i-- !== 0; )
          if (!this.deepEquals(a[i], b[i])) return false;
        return true;
      }

      if (arrA != arrB) return false;

      const dateA = a instanceof Date,
        dateB = b instanceof Date;
      if (dateA != dateB) return false;
      if (dateA && dateB) return a.getTime() == b.getTime();

      const regexpA = a instanceof RegExp,
        regexpB = b instanceof RegExp;
      if (regexpA != regexpB) return false;
      if (regexpA && regexpB) return a.toString() == b.toString();

      const keys = Object.keys(a);
      length = keys.length;

      if (length !== Object.keys(b).length) return false;

      for (i = length; i-- !== 0; )
        if (!Object.prototype.hasOwnProperty.call(b, keys[i])) return false;

      for (i = length; i-- !== 0; ) {
        key = keys[i];
        if (!this.deepEquals(a[key], b[key])) return false;
      }

      return true;
    }

    return a !== a && b !== b;
  },

  resolveFieldData(data, field) {
    if (data && Object.keys(data).length && field) {
      if (this.isFunction(field)) {
        return field(data);
      } else if (field.indexOf('.') === -1) {
        return data[field];
      } else {
        const fields = field.split('.');
        let value = data;
        for (let i = 0, len = fields.length; i < len; ++i) {
          if (value == null) {
            return null;
          }
          value = value[fields[i]];
        }
        return value;
      }
    } else {
      return null;
    }
  },

  isFunction(obj) {
    return !!(obj && obj.constructor && obj.call && obj.apply);
  },

  getItemValue(obj, ...params) {
    return this.isFunction(obj) ? obj(...params) : obj;
  },

  filter(value, fields, filterValue) {
    const filteredItems = [];

    if (value) {
      for (const item of value) {
        for (const field of fields) {
          if (
            String(this.resolveFieldData(item, field))
              .toLowerCase()
              .indexOf(filterValue.toLowerCase()) > -1
          ) {
            filteredItems.push(item);
            break;
          }
        }
      }
    }

    return filteredItems;
  },

  reorderArray(value, from, to) {
    let target;
    if (value && from !== to) {
      if (to >= value.length) {
        target = to - value.length;
        while (target-- + 1) {
          value.push(undefined);
        }
      }
      value.splice(to, 0, value.splice(from, 1)[0]);
    }
  },

  findIndexInList(value, list) {
    let index = -1;

    if (list) {
      for (let i = 0; i < list.length; i++) {
        if (list[i] === value) {
          index = i;
          break;
        }
      }
    }

    return index;
  },

  contains(value, list) {
    if (value != null && list && list.length) {
      for (const val of list) {
        if (this.equals(value, val)) return true;
      }
    }

    return false;
  },

  insertIntoOrderedArray(item, index, arr, sourceArr) {
    if (arr.length > 0) {
      let injected = false;
      for (let i = 0; i < arr.length; i++) {
        const currentItemIndex = this.findIndexInList(arr[i], sourceArr);
        if (currentItemIndex > index) {
          arr.splice(i, 0, item);
          injected = true;
          break;
        }
      }

      if (!injected) {
        arr.push(item);
      }
    } else {
      arr.push(item);
    }
  },

  removeAccents(str) {
    if (str && str.search(/[\xC0-\xFF]/g) > -1) {
      str = str
        .replace(/[\xC0-\xC5]/g, 'A')
        .replace(/[\xC6]/g, 'AE')
        .replace(/[\xC7]/g, 'C')
        .replace(/[\xC8-\xCB]/g, 'E')
        .replace(/[\xCC-\xCF]/g, 'I')
        .replace(/[\xD0]/g, 'D')
        .replace(/[\xD1]/g, 'N')
        .replace(/[\xD2-\xD6\xD8]/g, 'O')
        .replace(/[\xD9-\xDC]/g, 'U')
        .replace(/[\xDD]/g, 'Y')
        .replace(/[\xDE]/g, 'P')
        .replace(/[\xE0-\xE5]/g, 'a')
        .replace(/[\xE6]/g, 'ae')
        .replace(/[\xE7]/g, 'c')
        .replace(/[\xE8-\xEB]/g, 'e')
        .replace(/[\xEC-\xEF]/g, 'i')
        .replace(/[\xF1]/g, 'n')
        .replace(/[\xF2-\xF6\xF8]/g, 'o')
        .replace(/[\xF9-\xFC]/g, 'u')
        .replace(/[\xFE]/g, 'p')
        .replace(/[\xFD\xFF]/g, 'y');
    }

    return str;
  },

  getVNodeProp(vnode, prop) {
    const props = vnode.props;
    if (props) {
      const kebapProp = prop.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
      const propName = Object.prototype.hasOwnProperty.call(props, kebapProp)
        ? kebapProp
        : prop;

      return vnode.type.props[prop].type === Boolean && props[propName] === ''
        ? true
        : props[propName];
    }

    return null;
  },

  isEmpty(value) {
    return (
      value === null ||
      value === undefined ||
      value === '' ||
      (Array.isArray(value) && value.length === 0) ||
      (!(value instanceof Date) &&
        typeof value === 'object' &&
        Object.keys(value).length === 0)
    );
  },

  isNotEmpty(value) {
    return !this.isEmpty(value);
  },
};
