using System.Collections;
using System.Collections.Generic;
using System.Linq;

namespace AeroSearchREST.Common
{
    public static class Extantions
    {
        /// <summary>
        /// Indicates whether the specified enumerable is null or an empty.
        /// </summary>
        /// <typeparam name="T">class</typeparam>
        /// <param name="obj"></param>
        /// <returns>true if the value parameter is null or an empty; otherwise, false.</returns>
        public static bool IsNullOrEmpty<T>(this IEnumerable<T> obj) where T : class
        {
            return obj == null || !obj.Any();
        }
    }
}
