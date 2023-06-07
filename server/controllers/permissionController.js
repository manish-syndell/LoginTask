const connection = require("../db");


exports.getAllPermissions = async(req,res)=>{
    try {
        const query = "SELECT * FROM permissions";
        connection.query(query, (err, result) => {
          if (err) {
            console.log(err);
          }
          const permissions = result;
          res.status(200).json({
            success: true,
            permissions,
          });
        });
      } catch (error) {}
}


exports.getRolePermissions = async (req,res) => {
    const { id } = req.body;
    console.log(id)
    try {
      const query = "SELECT * FROM permissions WHERE role_id = ?";
      connection.query(query,[id], (err, result) => {
        if (err) {
         return console.log(error);
        }
        if (result.length === 0) {
         return res.status(404).json({
            message: "No permissions",
          });
        }

        const permissions = result;

         return res.status(200).json({
          permissions,
        });
      });
    } catch (error) {
        console.log(error)
    }
};

exports.updatePermissions = async(req,res) => {
    const { id, permissions } = req.body;
    console.log(id, permissions)
      try {
        // Delete existing permissions for user
        await connection.query(
          "DELETE FROM permissions WHERE role_id = ?",
          [id]
        );
    
        // Insert new permissions for user
        permissions.forEach(async (permission) => {
          await connection.query(
            "INSERT INTO permissions SET ?",
            { role_id: id, name: permission.name }
          );
        });
    
        res.status(200).send({ message: "Permissions updated successfully" });
      } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Server error" });
      }
};