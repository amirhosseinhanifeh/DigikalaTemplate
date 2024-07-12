using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace ALO.DataAccessLayer
{
    public static class SqlFileTrigger
    {
        public static string GetRawSql(Type migrationType, string sqlFileName)
        {
            var assembly = migrationType.Assembly;
            string resourceName = $"{migrationType.Namespace}.{sqlFileName}";
            using (Stream stream = assembly.GetManifestResourceStream(resourceName))
            {
                if (stream == null)
                {
                    throw new FileNotFoundException("Unable to find the SQL file from an embedded resource", resourceName);
                }

                using (var reader = new StreamReader(stream))
                {
                    string content = reader.ReadToEnd();
                    return content;
                }
            }
        }
    }
}
