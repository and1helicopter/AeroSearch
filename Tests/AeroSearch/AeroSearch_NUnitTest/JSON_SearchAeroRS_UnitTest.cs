using NUnit.Framework;
using System.IO;
using Newtonsoft.Json;
using AeroSearchREST.JSON;

namespace AeroSearch_NUnitTest
{
    public class Tests
    {
        [SetUp]
        public void Setup()
        {
        }

        [Test]
        public void SearchAeroRS_Test_1()
        {
            var pathDirectory = Directory.GetCurrentDirectory();
            var path = Directory.GetParent(pathDirectory).Parent.Parent.Parent;
            var pathFile = $"{path.FullName}\\response.json";

            var json = File.ReadAllText(pathFile);

            var test = JsonConvert.DeserializeObject<SearchAeroRS>(json);

            Assert.IsNotNull(test);
        }
    }
}