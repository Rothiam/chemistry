class ChemistryController < ApplicationController
  def index
    @elements = Element.all.pluck(:symbol).unshift(["Select an Element", nil])
  end

  def element_pair
    element1 = params[:element1]
    paired_elements = Molecule.where('atom1 = ? or atom2 = ?', element1, element1).pluck(:atom1, :atom2).flatten.uniq
    render json: paired_elements.unshift(["Select an Element"])
  end

  def molecule_bonds
    atom1 = params[:atom1]
    atom2 = params[:atom2]
    paired_elements = Molecule.where(atom1: atom1, atom2: atom2)
    paired_elements += Molecule.where(atom1: atom2, atom2: atom1)
    paired_elements = paired_elements.pluck(:bonds).uniq
    render json: paired_elements.unshift(["Select a Bond Value"])
  end

  def calculate_enthalpy
    energies = {reactant: 0, product: 0}
    [:reactant, :product].each do |type|
      params[type].keys.each do |molecule|
        atom1 = params[type][molecule][:atom_1]
        atom2 = params[type][molecule][:atom_2]
        bonds = params[type][molecule][:bonds]
        paired_elements = Molecule.where(atom1: atom1, atom2: atom2, bonds: bonds)
        paired_elements += Molecule.where(atom1: atom2, atom2: atom1, bonds: bonds)
        energy = paired_elements.pluck(:energy).first
        energies[type] += energy
      end
    end
    @reactant_energy = energies[:reactant]
    @product_energy = energies[:product]
    @enthalpy = energies[:product] - energies[:reactant]
    render json: {enthalpy: @enthalpy, reactant_energy: @reactant_energy, product_energy: @product_energy} 
  end


    def molecule_fields
    @elements = Element.all.pluck(:symbol).unshift(["Select an Element", nil])
    render partial: "molecule_fields", locals: {molecule_number: params[:molecule_number], type: params[:type]}
  end
end
