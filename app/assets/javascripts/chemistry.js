$(document).on("turbolinks:load", function() {
  $(".add_reactant_molecule").click(function() {
    event.preventDefault();
    var _this = this;
    $.ajax({
      url: "/molecule_fields",
      data: {type: "reactant", molecule_number: $(".reactant_molecule_fields").length + 1},
      success: function(data) {
        $(_this).before("<span>+</span>");
        $(_this).before(data);
        resetReactantMoleculeNumbers();
        setListeners();
      }
    });
  });
  $(".add_product_molecule").click(function() {
    event.preventDefault();
    var _this = this;
    $.ajax({
      url: "/molecule_fields",
      data: {type: "product", molecule_number: $(".product_molecule_fields").length + 1},
      success: function(data) {
        $(_this).before("<span>+</span>");
        $(_this).before(data);
        resetProductMoleculeNumbers();
        setListeners();
      }
    });
  });
  $(document).on("ajax:success", function(event) {
    var reactant_energy = event.detail[0].reactant_energy
    var enthalpy = event.detail[0].enthalpy
    var product_energy = event.detail[0].product_energy
    $("#reactant_energy").text("Reactant energy: " + reactant_energy);
    $("#results").text("Change in enthalpy: " + enthalpy);
    $("#product_energy").text("Product energy: " + product_energy);
  });
  setListeners();
});

var resetReactantMoleculeNumbers = function() {
  // var molecules = $(".reactants_molecule_fields");
  // for(var i = 0; i < molecules.length; i++) {
  //   $($($(molecules[i])[0]).children()[0]).attr("id", "reactants[molecule_" + (i + 1) + "][atom_1]");
  //   $($($(molecules[i])[0]).children()[0]).attr("name", "reactants[molecule_" + (i + 1) + "][atom_1]");
  //   $($($(molecules[i])[0]).children()[1]).attr("id", "reactants[molecule_" + (i + 1) +"_bonds");
  //   $($($(molecules[i])[0]).children()[1]).attr("name", "reactants[molecule_" + (i + 1) + "][bonds]");
  //   $($($(molecules[i])[0]).children()[2]).attr("id", "reactants[molecule_" + (i + 1) + "][atom_2]")
  //   $($($(molecules[i])[0]).children()[2]).attr("name", "reactants[molecule_" + (i + 1) + "][atom_2]")
  // }
}

var resetProductMoleculeNumbers = function() {
  // var molecules = $(".products_molecule_fields");
  // for(var i = 0; i < molecules.length; i++) {
  //   $($($(molecules[i])[0]).children()[0]).attr("id", "products[molecule_" + (i + 1) + "][atom_1]");
  //   $($($(molecules[i])[0]).children()[0]).attr("name", "products[molecule_" + (i + 1) + "][atom_1]");
  //   $($($(molecules[i])[0]).children()[1]).attr("id", "products[molecule_" + (i + 1) +"_bonds");
  //   $($($(molecules[i])[0]).children()[1]).attr("name", "products[molecule_" + (i + 1) + "][bonds]");
  //   $($($(molecules[i])[0]).children()[2]).attr("id", "products[molecule_" + (i + 1) + "][atom_2]")
  //   $($($(molecules[i])[0]).children()[2]).attr("name", "products[molecule_" + (i + 1) + "][atom_2]")
  // }
}

var setListeners = function() {
  $(".select_atom").off("change").on("change", function() {
    var element1 = $(this).val();
    $next_atom_selector = $($(this).next().next());
    $.ajax({
      url: '/element_pair',
      data: {element1: element1},
      success: function(data){
        $next_atom_selector.empty();
        $.each(data, function(index, element) {
          $next_atom_selector.append($("<option></option>").attr("value",element).text(element));
        });
        $next_atom_selector.trigger("change");
      },
      error: function(data){
        alert("There was an error")
      }
    })
  });

  $(".second_select_atom").off("change").on("change", function() {
    var atom1 = $(this).prev().prev().val();
    var atom2 = $(this).val();
    $prev_bond_selector = $($(this).prev());
    $.ajax({
      url: '/molecule_bonds',
      data: {atom1: atom1, atom2: atom2},
      success: function(data){
        $prev_bond_selector.empty();
        $.each(data, function(index, element) {
          $prev_bond_selector.append($("<option></option>").attr("value",element).text(element));
        });
      },
      error: function(data){
        alert("There was an error")
      }
    });
  });
  //
  // $(".energy").click(function() {
  //   var atom1 = $(this).prev().prev().val();
  //   var atom2 = $(this).val();
  //   $prev_bond_selector = $($(this).prev());
  //   $.ajax({
  //     url: '/molecule_bonds',
  //     data: {atom1: atom1, atom2: atom2},
  //     success: function(data){
  //       $prev_bond_selector.empty();
  //       $.each(data, function(index, element) {
  //         $prev_bond_selector.append($("<option></option>").attr("value",element).text(element));
  //       });
  //     },
  //     error: function(data){
  //       alert("There was an error")
  //     }
  //   });
  // });

  // $("#enthalpy_form").on("ajax:success", function(xhr, data, status, xhr) {
  //   debugger
  //   console.log(data.delta_enthalpy)
  // }).on("ajax:error", function(e, xhr, status, error) {
  //   debugger
  //   console.log(data.delta_enthalpy)
  // });
};
